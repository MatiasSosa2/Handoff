import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  LayoutDashboard,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { createAppointment, listAppointments, updateAppointmentStatus } from '../utils/appointmentsApi';
import type { Appointment, AppointmentStatus, CreateAppointmentPayload } from '../types/appointments';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Asesoría inicial',
  'Recorrido de propiedad',
  'Reunión de inversión',
  'Consultoría privada',
];

const timeSlots = ['09:00', '10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];

const emptyFormData: CreateAppointmentPayload = {
  name: '',
  email: '',
  phone: '',
  service: services[0],
  appointmentDate: '',
  appointmentTime: timeSlots[4],
  notes: '',
  source: 'internal',
};

const statusMeta: Record<AppointmentStatus, { label: string; badgeClass: string; buttonClass: string }> = {
  pending: {
    label: 'Pendiente',
    badgeClass: 'border-amber-400/20 bg-amber-500/15 text-amber-200',
    buttonClass: 'border-amber-400/25 text-amber-200 hover:bg-amber-500/10',
  },
  confirmed: {
    label: 'Confirmado',
    badgeClass: 'border-emerald-400/20 bg-emerald-500/15 text-emerald-200',
    buttonClass: 'border-emerald-400/25 text-emerald-200 hover:bg-emerald-500/10',
  },
  completed: {
    label: 'Completado',
    badgeClass: 'border-sky-400/20 bg-sky-500/15 text-sky-200',
    buttonClass: 'border-sky-400/25 text-sky-200 hover:bg-sky-500/10',
  },
  cancelled: {
    label: 'Cancelado',
    badgeClass: 'border-rose-400/20 bg-rose-500/15 text-rose-200',
    buttonClass: 'border-rose-400/25 text-rose-200 hover:bg-rose-500/10',
  },
};

const formatAppointmentDate = (date: string, time: string) => {
  const parsedDate = new Date(`${date}T${time}`);

  if (Number.isNaN(parsedDate.getTime())) {
    return `${date} ${time}`;
  }

  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsedDate);
};

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLElement>(null);
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL?.trim();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState<CreateAppointmentPayload>(emptyFormData);
  const [selectedStatus, setSelectedStatus] = useState<'all' | AppointmentStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingId, setIsUpdatingId] = useState<number | null>(null);
  const [pageError, setPageError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useGSAP(() => {
    gsap.from('.turnos-hero-item', {
      scrollTrigger: {
        trigger: '.turnos-hero',
        start: 'top 82%',
      },
      y: 46,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
    });

    gsap.from('.turnos-card', {
      scrollTrigger: {
        trigger: '.turnos-main',
        start: 'top 78%',
      },
      y: 42,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  useEffect(() => {
    const loadData = async () => {
      try {
        setPageError('');
        const data = await listAppointments();
        setAppointments(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'No se pudieron cargar los turnos.';
        setPageError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, []);

  const handleFieldChange = <K extends keyof CreateAppointmentPayload>(field: K, value: CreateAppointmentPayload[K]) => {
    setSuccessMessage('');
    setFormError('');
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const refreshAppointments = async () => {
    const data = await listAppointments();
    setAppointments(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const scheduledAt = new Date(`${formData.appointmentDate}T${formData.appointmentTime}:00`);

    if (Number.isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
      setFormError('Elegí una fecha y un horario futuro para crear el turno.');
      return;
    }

    try {
      setIsSaving(true);
      setFormError('');
      setSuccessMessage('');
      const createdAppointment = await createAppointment({
        ...formData,
        source: calendlyUrl ? 'calendly' : 'internal',
      });

      await refreshAppointments();
      setFormData(emptyFormData);
      setSuccessMessage(
        `Turno registrado para ${createdAppointment.name} el ${formatAppointmentDate(createdAppointment.appointmentDate, createdAppointment.appointmentTime)}.`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo registrar el turno.';
      setFormError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusUpdate = async (appointmentId: number, status: AppointmentStatus) => {
    try {
      setIsUpdatingId(appointmentId);
      setPageError('');
      await updateAppointmentStatus(appointmentId, status);
      await refreshAppointments();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo actualizar el turno.';
      setPageError(message);
    } finally {
      setIsUpdatingId(null);
    }
  };

  const openAdminPanel = () => {
    setIsAdminOpen(true);
    window.setTimeout(() => {
      adminRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch = !normalizedSearch
      || appointment.name.toLowerCase().includes(normalizedSearch)
      || appointment.email.toLowerCase().includes(normalizedSearch)
      || appointment.service.toLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  const upcomingAppointments = appointments
    .filter((appointment) => appointment.status !== 'cancelled')
    .slice(0, 3);

  const statusCounts = appointments.reduce<Record<'all' | AppointmentStatus, number>>((accumulator, appointment) => {
    accumulator.all += 1;
    accumulator[appointment.status] += 1;
    return accumulator;
  }, {
    all: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <section className="turnos-hero relative min-h-[72vh] flex items-center px-6 md:px-12 py-28 overflow-hidden" data-navbar-theme="dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(194,163,126,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(61,64,53,0.34),transparent_32%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a0a0a]/65 to-[#0a0a0a] z-10" />
          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2069&auto=format&fit=crop"
            alt="Sala de reuniones premium"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <span className="turnos-hero-item inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-gold">
              <Sparkles size={14} />
              Turnos automatizados
            </span>
            <h1 className="turnos-hero-item mt-8 text-5xl md:text-7xl font-serif italic leading-[0.92] max-w-5xl">
              Reservas privadas con
              <span className="text-gold"> registro en MySQL</span>
            </h1>
            <p className="turnos-hero-item mt-6 max-w-3xl text-lg md:text-xl font-light leading-relaxed text-white/65">
              La antigua página de contacto ahora funciona como agenda online. El cliente pide turno desde esta misma pantalla y el dueño entra a un panel separado para administrar cada solicitud.
            </p>
            <div className="turnos-hero-item mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="#booking-form"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black transition-all duration-500 hover:bg-gold"
              >
                Reservar turno
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={openAdminPanel}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:border-gold/40 hover:bg-gold/10"
              >
                <LayoutDashboard size={18} />
                Acceso administrador
              </button>
            </div>
          </div>

        </div>
      </section>

      <section id="booking-form" className="turnos-main px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
          <div className="turnos-card rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-6 md:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.35em] text-gold">Agenda</span>
                <h2 className="text-4xl md:text-5xl font-light leading-tight">
                  Pedí un <span className="font-serif italic text-gold">turno privado</span>
                </h2>
              </div>
              <div className="max-w-xs rounded-[20px] border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/55">
                Duración sugerida: 45 minutos. Atención premium con validación de disponibilidad en servidor.
              </div>
            </div>

            {pageError && (
              <div className="mb-5 rounded-[18px] border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {pageError}
              </div>
            )}

            {successMessage && (
              <div className="mb-5 rounded-[18px] border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-light tracking-wider text-white/65">Nombre completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold"
                    placeholder="Nombre y apellido"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-light tracking-wider text-white/65">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold"
                    placeholder="nombre@empresa.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-light tracking-wider text-white/65">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(event) => handleFieldChange('phone', event.target.value)}
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold"
                    placeholder="+54 11 ..."
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-light tracking-wider text-white/65">Tipo de turno *</label>
                  <select
                    value={formData.service}
                    onChange={(event) => handleFieldChange('service', event.target.value)}
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors focus:border-gold"
                  >
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-[#101010] text-white">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-light tracking-wider text-white/65">Horario *</label>
                  <select
                    value={formData.appointmentTime}
                    onChange={(event) => handleFieldChange('appointmentTime', event.target.value)}
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors focus:border-gold"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#101010] text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6">
                <div>
                  <label className="mb-3 block text-sm font-light tracking-wider text-white/65">Fecha *</label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={formData.appointmentDate}
                    onChange={(event) => handleFieldChange('appointmentDate', event.target.value)}
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors focus:border-gold"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-light tracking-wider text-white/65">Notas</label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(event) => handleFieldChange('notes', event.target.value)}
                    className="w-full rounded-[18px] border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-white/25 resize-none focus:border-gold"
                    placeholder="Contexto, asistentes o necesidades para la reunión."
                  />
                </div>
              </div>

              {formError && (
                <div className="rounded-[18px] border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {formError}
                </div>
              )}

              <div className="flex flex-col gap-5 border-t border-white/10 pt-5 lg:flex-row lg:items-center lg:justify-between">
                <p className="max-w-xl text-sm leading-relaxed text-white/40">
                  El turno se persiste en MySQL. La interfaz también queda preparada para derivar a Calendly si cargás una URL externa.
                </p>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? <LoaderCircle size={18} className="animate-spin" /> : <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                  {isSaving ? 'Guardando' : 'Confirmar turno'}
                </button>
              </div>
            </form>
          </div>

          <div className="turnos-card space-y-5 xl:sticky xl:top-28">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
              <div className="mb-5 flex items-center gap-3">
                <CalendarClock className="text-gold" size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Cómo funciona</span>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <UserRound className="mt-1 shrink-0 text-gold" size={18} />
                  <div>
                    <h3 className="mb-1 font-medium text-white">Reserva del cliente</h3>
                    <p className="text-sm leading-relaxed text-white/50">El visitante completa fecha, horario y tipo de reunión desde la misma página.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <BellRing className="mt-1 shrink-0 text-gold" size={18} />
                  <div>
                    <h3 className="mb-1 font-medium text-white">Confirmación operativa</h3>
                    <p className="text-sm leading-relaxed text-white/50">El registro queda listo para conectar envío real de mails al cliente y al dueño.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="mt-1 shrink-0 text-gold" size={18} />
                  <div>
                    <h3 className="mb-1 font-medium text-white">Gestión separada</h3>
                    <p className="text-sm leading-relaxed text-white/50">El administrador no entra por el formulario: lo hace desde un botón exclusivo en esta misma experiencia.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
              <span className="mb-5 block text-xs font-bold uppercase tracking-[0.3em] text-gold">Próximos turnos</span>
              {isLoading ? (
                <div className="flex items-center gap-3 text-white/50">
                  <LoaderCircle size={18} className="animate-spin" />
                  Cargando agenda...
                </div>
              ) : upcomingAppointments.length === 0 ? (
                <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm text-white/50">
                  Todavía no hay turnos cargados en la base.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="rounded-[18px] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-medium text-white">{appointment.name}</div>
                          <div className="text-sm text-white/45">{appointment.service}</div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em] ${statusMeta[appointment.status].badgeClass}`}>
                          {statusMeta[appointment.status].label}
                        </span>
                      </div>
                      <div className="text-sm text-white/60">{formatAppointmentDate(appointment.appointmentDate, appointment.appointmentTime)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
              <span className="mb-5 block text-xs font-bold uppercase tracking-[0.3em] text-gold">Canal operativo</span>
              <div className="space-y-5 text-sm text-white/60">
                <div className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
                  <span>+54 11 4567-8900</span>
                </div>
                <div className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
                  <span>agenda@handoff.com.ar</span>
                </div>
                <div className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                  <span>Atención presencial y virtual en Palermo y Puerto Madero.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isAdminOpen && (
        <section ref={adminRef} className="px-6 md:px-12 pb-28">
          <div className="max-w-7xl mx-auto rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 md:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.26)] backdrop-blur-md">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.35em] text-gold">Modo administrador</span>
                <h2 className="text-4xl md:text-5xl font-light leading-tight">
                  Panel de <span className="font-serif italic text-gold">gestión</span> de turnos
                </h2>
                <p className="mt-4 max-w-3xl leading-relaxed text-white/55">
                  Este acceso queda dentro de la misma página, pero separado del flujo público. El dueño del negocio puede revisar la base, filtrar citas y administrar estados en tiempo real.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-white/70 transition-colors hover:border-gold/35 hover:text-gold"
              >
                Cerrar panel
              </button>
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <div className="rounded-[20px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">Total</div>
                <div className="text-4xl font-light">{statusCounts.all}</div>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">Pendientes</div>
                <div className="text-4xl font-light">{statusCounts.pending}</div>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">Confirmados</div>
                <div className="text-4xl font-light">{statusCounts.confirmed}</div>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">Hoy</div>
                <div className="text-4xl font-light">{appointments.filter((appointment) => appointment.appointmentDate === today).length}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-6 items-start">
              <div className="space-y-4 rounded-[22px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/45">Filtro</span>
                  <div className="mt-4 flex flex-col gap-2">
                    {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setSelectedStatus(status)}
                        className={`rounded-[16px] px-4 py-2.5 text-left text-sm transition-colors ${selectedStatus === status ? 'bg-gold text-black' : 'bg-white/5 text-white/65 hover:bg-white/10'}`}
                      >
                        {status === 'all' ? 'Todos los turnos' : statusMeta[status].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/45">Buscar</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="w-full rounded-[16px] border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold"
                      placeholder="Nombre, email o servicio"
                    />
                  </div>
                </div>

                <div className="rounded-[16px] border border-gold/15 bg-gold/10 p-3.5 text-sm leading-relaxed text-white/70">
                  La base de datos valida disponibilidad por servicio, fecha y horario antes de crear cada turno.
                </div>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="rounded-[22px] border border-white/10 bg-black/20 p-6 text-white/50">
                    Cargando turnos desde MySQL...
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="rounded-[22px] border border-white/10 bg-black/20 p-6 text-white/50">
                    No hay turnos para el filtro actual.
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <article key={appointment.id} className="rounded-[22px] border border-white/10 bg-black/20 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="text-2xl font-light">{appointment.name}</h3>
                              <p className="mt-1 text-sm text-white/45">{appointment.service}</p>
                            </div>
                            <span className={`inline-flex w-fit rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] ${statusMeta[appointment.status].badgeClass}`}>
                              {statusMeta[appointment.status].label}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 text-sm text-white/65">
                            <div className="min-w-0 rounded-[16px] border border-white/10 bg-white/5 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/35">Agenda</div>
                              <div>{formatAppointmentDate(appointment.appointmentDate, appointment.appointmentTime)}</div>
                            </div>
                            <div className="min-w-0 rounded-[16px] border border-white/10 bg-white/5 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/35">Contacto</div>
                              <div className="break-all leading-relaxed">{appointment.email}</div>
                              <div className="mt-1 break-words">{appointment.phone}</div>
                            </div>
                            <div className="min-w-0 rounded-[16px] border border-white/10 bg-white/5 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/35">Origen</div>
                              <div className="break-words leading-relaxed">{appointment.source === 'calendly' ? 'Calendly / externo' : 'Formulario interno'}</div>
                            </div>
                            <div className="min-w-0 rounded-[16px] border border-white/10 bg-white/5 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/35">Notificación</div>
                              <div className="break-words leading-relaxed">{appointment.clientEmailSent ? 'Cliente: marcada' : 'Cliente: pendiente'}</div>
                              <div className="mt-1 break-words leading-relaxed">{appointment.ownerEmailSent ? 'Negocio: marcada' : 'Negocio: pendiente'}</div>
                            </div>
                          </div>

                          {appointment.notes && (
                            <div className="rounded-[16px] border border-white/10 bg-white/5 p-3.5 text-sm leading-relaxed text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                              {appointment.notes}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-3 xl:w-[220px]">
                          <button
                            type="button"
                            disabled={isUpdatingId === appointment.id}
                            onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                            className={`rounded-[16px] border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${statusMeta.confirmed.buttonClass}`}
                          >
                            Confirmar
                          </button>
                          <button
                            type="button"
                            disabled={isUpdatingId === appointment.id}
                            onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                            className={`rounded-[16px] border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${statusMeta.completed.buttonClass}`}
                          >
                            Marcar completado
                          </button>
                          <button
                            type="button"
                            disabled={isUpdatingId === appointment.id}
                            onClick={() => handleStatusUpdate(appointment.id, 'pending')}
                            className={`rounded-[16px] border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${statusMeta.pending.buttonClass}`}
                          >
                            Volver a pendiente
                          </button>
                          <button
                            type="button"
                            disabled={isUpdatingId === appointment.id}
                            onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                            className={`rounded-[16px] border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${statusMeta.cancelled.buttonClass}`}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Contact;
