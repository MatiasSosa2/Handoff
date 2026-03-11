import { updateAppointmentStatus, validStatuses } from '../../_lib/appointments.js';
import { allowMethods, sendError, sendJson } from '../../_lib/http.js';

export default async function handler(request, response) {
  if (!allowMethods(request, response, ['PATCH'])) {
    return;
  }

  try {
    const appointmentId = Number(request.query.id);
    const { status } = request.body ?? {};

    if (!Number.isInteger(appointmentId) || appointmentId <= 0) {
      sendJson(response, 400, { error: 'El identificador del turno no es válido.' });
      return;
    }

    if (!validStatuses.has(status)) {
      sendJson(response, 400, { error: 'El estado del turno no es válido.' });
      return;
    }

    const appointment = await updateAppointmentStatus(appointmentId, status);
    sendJson(response, 200, { data: appointment });
  } catch (error) {
    console.error('Appointment status API failed:', error);
    sendError(response, error, 'No se pudo actualizar el turno.');
  }
}