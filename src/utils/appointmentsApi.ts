import type { Appointment, AppointmentStatus, CreateAppointmentPayload } from '../types/appointments';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || '';

const buildUrl = (path: string) => `${apiBaseUrl}${path}`;

const parseResponse = async <T>(response: Response): Promise<T> => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.error === 'string'
      ? payload.error
      : 'No se pudo completar la operación con el servidor.';

    throw new Error(message);
  }

  return payload as T;
};

export const listAppointments = async () => {
  const response = await fetch(buildUrl('/api/appointments'));
  const payload = await parseResponse<{ data: Appointment[] }>(response);
  return payload.data;
};

export const createAppointment = async (body: CreateAppointmentPayload) => {
  const response = await fetch(buildUrl('/api/appointments'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await parseResponse<{ data: Appointment }>(response);
  return payload.data;
};

export const updateAppointmentStatus = async (appointmentId: number, status: AppointmentStatus) => {
  const response = await fetch(buildUrl(`/api/appointments/${appointmentId}/status`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  const payload = await parseResponse<{ data: Appointment }>(response);
  return payload.data;
};