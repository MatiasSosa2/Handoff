import { createAppointment, listAppointments, validSources } from '../_lib/appointments.js';
import { allowMethods, sendError, sendJson } from '../_lib/http.js';

export default async function handler(request, response) {
  if (!allowMethods(request, response, ['GET', 'POST'])) {
    return;
  }

  try {
    if (request.method === 'GET') {
      const appointments = await listAppointments();
      sendJson(response, 200, { data: appointments });
      return;
    }

    const {
      name,
      email,
      phone,
      service,
      appointmentDate,
      appointmentTime,
      notes = '',
      source = 'internal',
    } = request.body ?? {};

    if (!name || !email || !phone || !service || !appointmentDate || !appointmentTime) {
      sendJson(response, 400, { error: 'Faltan campos obligatorios para crear el turno.' });
      return;
    }

    if (!validSources.has(source)) {
      sendJson(response, 400, { error: 'El origen del turno no es válido.' });
      return;
    }

    const appointment = await createAppointment({
      name,
      email,
      phone,
      service,
      appointmentDate,
      appointmentTime,
      notes,
      source,
    });

    sendJson(response, 201, { data: appointment });
  } catch (error) {
    console.error('Appointments API failed:', error);
    sendError(response, error, 'No se pudo procesar el turno.');
  }
}