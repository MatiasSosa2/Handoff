import dotenv from 'dotenv';
import express from 'express';
import { getPool } from './db.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const port = Number(process.env.API_PORT || 3301);
const validStatuses = new Set(['pending', 'confirmed', 'completed', 'cancelled']);
const validSources = new Set(['internal', 'calendly']);

app.use(express.json());

const mapAppointment = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  service: row.service,
  appointmentDate: row.appointment_date instanceof Date
    ? row.appointment_date.toISOString().split('T')[0]
    : row.appointment_date,
  appointmentTime: String(row.appointment_time).slice(0, 5),
  notes: row.notes || '',
  status: row.status,
  source: row.source,
  clientEmailSent: Boolean(row.client_email_sent),
  ownerEmailSent: Boolean(row.owner_email_sent),
  createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
});

const sendError = (response, statusCode, message) => {
  response.status(statusCode).json({ error: message });
};

app.get('/api/health', async (_request, response) => {
  try {
    await getPool();
    response.json({ ok: true });
  } catch (error) {
    console.error('Healthcheck failed:', error);
    sendError(response, 500, 'No se pudo conectar con MySQL.');
  }
});

app.get('/api/appointments', async (_request, response) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query(`
      SELECT *
      FROM appointments
      ORDER BY appointment_date ASC, appointment_time ASC, created_at DESC
    `);

    response.json({ data: rows.map(mapAppointment) });
  } catch (error) {
    console.error('Failed to list appointments:', error);
    sendError(response, 500, 'No se pudieron cargar los turnos desde MySQL.');
  }
});

app.post('/api/appointments', async (request, response) => {
  const { name, email, phone, service, appointmentDate, appointmentTime, notes = '', source = 'internal' } = request.body ?? {};

  if (!name || !email || !phone || !service || !appointmentDate || !appointmentTime) {
    sendError(response, 400, 'Faltan campos obligatorios para crear el turno.');
    return;
  }

  if (!validSources.has(source)) {
    sendError(response, 400, 'El origen del turno no es válido.');
    return;
  }

  try {
    const pool = await getPool();
    const [conflicts] = await pool.query(`
      SELECT id
      FROM appointments
      WHERE service = ?
        AND appointment_date = ?
        AND appointment_time = ?
        AND status <> 'cancelled'
      LIMIT 1
    `, [service, appointmentDate, `${appointmentTime}:00`]);

    if (Array.isArray(conflicts) && conflicts.length > 0) {
      sendError(response, 409, 'Ese horario ya está tomado para este tipo de reunión.');
      return;
    }

    const [result] = await pool.query(`
      INSERT INTO appointments (
        name,
        email,
        phone,
        service,
        appointment_date,
        appointment_time,
        notes,
        source,
        client_email_sent,
        owner_email_sent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1)
    `, [name, email, phone, service, appointmentDate, `${appointmentTime}:00`, notes, source]);

    const [rows] = await pool.query('SELECT * FROM appointments WHERE id = ?', [result.insertId]);
    response.status(201).json({ data: mapAppointment(rows[0]) });
  } catch (error) {
    console.error('Failed to create appointment:', error);
    sendError(response, 500, 'No se pudo guardar el turno en MySQL.');
  }
});

app.patch('/api/appointments/:id/status', async (request, response) => {
  const appointmentId = Number(request.params.id);
  const { status } = request.body ?? {};

  if (!Number.isInteger(appointmentId) || appointmentId <= 0) {
    sendError(response, 400, 'El identificador del turno no es válido.');
    return;
  }

  if (!validStatuses.has(status)) {
    sendError(response, 400, 'El estado del turno no es válido.');
    return;
  }

  try {
    const pool = await getPool();
    const [result] = await pool.query('UPDATE appointments SET status = ? WHERE id = ?', [status, appointmentId]);

    if (result.affectedRows === 0) {
      sendError(response, 404, 'No existe el turno que intentás actualizar.');
      return;
    }

    const [rows] = await pool.query('SELECT * FROM appointments WHERE id = ?', [appointmentId]);
    response.json({ data: mapAppointment(rows[0]) });
  } catch (error) {
    console.error('Failed to update appointment:', error);
    sendError(response, 500, 'No se pudo actualizar el turno en MySQL.');
  }
});

app.listen(port, async () => {
  try {
    await getPool();
    console.log(`API de turnos activa en http://localhost:${port}`);
  } catch (error) {
    console.error('No se pudo inicializar la conexión con MySQL:', error);
  }
});