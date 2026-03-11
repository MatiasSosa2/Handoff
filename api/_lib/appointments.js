import { getPool } from './db.js';

export const validStatuses = new Set(['pending', 'confirmed', 'completed', 'cancelled']);
export const validSources = new Set(['internal', 'calendly']);

export const mapAppointment = (row) => ({
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

export const listAppointments = async () => {
  const pool = await getPool();
  const [rows] = await pool.query(`
    SELECT *
    FROM appointments
    ORDER BY appointment_date ASC, appointment_time ASC, created_at DESC
  `);

  return rows.map(mapAppointment);
};

export const createAppointment = async ({ name, email, phone, service, appointmentDate, appointmentTime, notes = '', source = 'internal' }) => {
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
    const error = new Error('Ese horario ya está tomado para este tipo de reunión.');
    error.statusCode = 409;
    throw error;
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
  return mapAppointment(rows[0]);
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const pool = await getPool();
  const [result] = await pool.query('UPDATE appointments SET status = ? WHERE id = ?', [status, appointmentId]);

  if (result.affectedRows === 0) {
    const error = new Error('No existe el turno que intentás actualizar.');
    error.statusCode = 404;
    throw error;
  }

  const [rows] = await pool.query('SELECT * FROM appointments WHERE id = ?', [appointmentId]);
  return mapAppointment(rows[0]);
};