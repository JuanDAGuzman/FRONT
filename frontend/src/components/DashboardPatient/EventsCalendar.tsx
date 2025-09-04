import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api.ts";

import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Modal({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full relative border border-gray-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 font-bold text-2xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export interface Appointment {
  id: number;
  title: string;
  date: string;
  time: string;
  doctor: string;
  location: string;
  status: string;
  type: string;
  meetingLink?: string | null;
  fullDate?: string;
}

interface EventsCalendarProps {
  patientId: number;
}

const EventsCalendar: React.FC<EventsCalendarProps> = ({ patientId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [pastPage, setPastPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch<any[]>(
          `/api/appointments?patientId=${patientId}`
        );
        if (cancelled) return;
        if (Array.isArray(data)) {
          const citas = data.map((cita: any) => ({
            id: cita.id,
            title:
              cita.type === "virtual"
                ? "Consulta Virtual"
                : "Consulta Presencial",
            date: new Date(cita.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            }),
            time: new Date(cita.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            doctor: cita.Doctor?.User?.name ?? "Por asignar",
            location:
              cita.type === "virtual"
                ? "Online"
                : cita.location || "Por confirmar",
            status: cita.status,
            type: cita.type,
            meetingLink: cita.meetingLink,
            fullDate: cita.date,
          }));
          setAppointments(citas);
        }
      } catch (e) {
        // opcional: setear estado de error
      }
    })();
    return () => {
      cancelled = true;
    };
    // ⚠️ No dependas de currentDate aquí: dispara refetch innecesario
  }, [patientId]);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      direction === "prev"
        ? newDate.setMonth(prev.getMonth() - 1)
        : newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const isCurrentMonth =
    currentDate.getMonth() === currentMonth &&
    currentDate.getFullYear() === currentYear;

  const now = new Date();
  const upcomingEvents = appointments.filter((appt) => {
    const apptDate = new Date(appt.fullDate || "");
    return apptDate >= now && appt.status !== "finalizada";
  });

  const daysWithEvents = upcomingEvents
    .filter(
      (appt) =>
        new Date(appt.fullDate || "").getMonth() === currentDate.getMonth() &&
        new Date(appt.fullDate || "").getFullYear() ===
          currentDate.getFullYear()
    )
    .map((appt) => new Date(appt.fullDate || "").getDate());

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const eventos = upcomingEvents.filter((appt) => {
      const d = new Date(appt.fullDate || "");
      return (
        d.getDate() === day &&
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      );
    });
    if (eventos.length > 0) {
      setSelectedDayEvents(eventos);
      setShowModal(true);
    }
  };

  const pastEvents = appointments.filter((appt) => {
    const apptDate = new Date(appt.fullDate || "");
    return apptDate < now || appt.status === "finalizada";
  });

  const sortedPastEvents = [...pastEvents].sort(
    (a, b) =>
      new Date(b.fullDate || "").getTime() -
      new Date(a.fullDate || "").getTime()
  );
  const totalPastPages = Math.ceil(sortedPastEvents.length / pageSize);
  const paginatedPastEvents = sortedPastEvents.slice(
    (pastPage - 1) * pageSize,
    pastPage * pageSize
  );

  useEffect(() => {
    if (pastPage > totalPastPages) setPastPage(1);
  }, [totalPastPages]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Calendar className="w-6 h-6 text-red-600 mr-2" />
        Próximos Eventos
      </h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {months[currentDate.getMonth()]} de {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center text-sm font-medium py-2 text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const hasEvent = day && daysWithEvents.includes(day);
            return (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center text-sm rounded transition-colors cursor-pointer
                  ${
                    day === null
                      ? ""
                      : day === today && isCurrentMonth
                      ? "bg-red-700 text-white font-bold shadow-sm"
                      : hasEvent
                      ? "bg-green-100 border border-green-400 text-green-800 font-semibold hover:bg-green-200"
                      : "hover:bg-red-50 hover:text-red-700 text-gray-700"
                  }
                `}
                onClick={() => handleDayClick(day)}
              >
                {day}
                {hasEvent && day !== null ? (
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full block mt-0.5" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Próximas Citas</h3>
          {upcomingEvents.length === 0 ? (
            <div className="text-gray-500 text-sm">No hay citas próximas.</div>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {event.title}
                  </h4>
                  <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                    {event.date}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-2" />
                    {event.doctor}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Citas Pasadas</h3>
          {paginatedPastEvents.length === 0 ? (
            <div className="text-gray-500 text-sm">No hay citas pasadas.</div>
          ) : (
            paginatedPastEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow opacity-60"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {event.title}
                  </h4>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                    {event.date}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-2" />
                    {event.doctor}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    Estado: {event.status}
                  </div>
                </div>
              </div>
            ))
          )}
          {totalPastPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-2">
              <button
                onClick={() => setPastPage((p) => Math.max(1, p - 1))}
                disabled={pastPage === 1}
                className={`px-3 py-1 rounded ${
                  pastPage === 1
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } font-medium text-sm`}
              >
                Anterior
              </button>
              <span className="text-gray-600 text-sm">
                Página {pastPage} de {totalPastPages}
              </span>
              <button
                onClick={() =>
                  setPastPage((p) => Math.min(totalPastPages, p + 1))
                }
                disabled={pastPage === totalPastPages}
                className={`px-3 py-1 rounded ${
                  pastPage === totalPastPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } font-medium text-sm`}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h3 className="font-bold text-lg text-green-700 mb-2">
          Citas para el día seleccionado
        </h3>
        {selectedDayEvents.map((event) => (
          <div key={event.id} className="mb-4">
            <div>
              <b>{event.title}</b>
              <div className="text-xs text-gray-700">
                {event.date} a las {event.time}
              </div>
              <div className="text-xs text-gray-700">
                Doctor: {event.doctor}
              </div>
              <div className="text-xs text-gray-700">
                Ubicación: {event.location}
              </div>
              <div className="text-xs text-gray-700">
                Estado: {event.status}
              </div>
              {event.type === "virtual" && event.meetingLink && (
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-3 py-1 mt-2 rounded transition"
                >
                  Unirse a la Videollamada
                </a>
              )}
            </div>
            <hr className="my-2" />
          </div>
        ))}
        {selectedDayEvents.length === 0 && (
          <div className="text-gray-600">No hay citas este día.</div>
        )}
      </Modal>
    </div>
  );
};

export default EventsCalendar;
