export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type AppointmentSource = 'internal' | 'calendly';

export type Appointment = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  status: AppointmentStatus;
  source: AppointmentSource;
  clientEmailSent: boolean;
  ownerEmailSent: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateAppointmentPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  source: AppointmentSource;
};