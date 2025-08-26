import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";

const ModalBase: React.FC<{
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  widthClass?: string;
}> = ({ open, title, children, onClose, widthClass }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.08)" }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${
          widthClass || "max-w-xl"
        } relative`}
      >
        <div className="p-6 border-b flex items-center">
          <h2 className="text-2xl font-bold flex-1">{title}</h2>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const MedicalHistoryModal: React.FC<{
  open: boolean;
  onClose: () => void;
  patientId: number | null;
  onSuccess: () => void;
}> = ({ open, onClose, patientId, onSuccess }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;
  if (!patientId) {
    return (
      <ModalBase
        open={true}
        title="Falta información de la cita"
        onClose={onClose}
      >
        <button
          type="button"
          className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 mt-2"
          onClick={onClose}
        >
          Cerrar
        </button>
      </ModalBase>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:4000/api/medical-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId,
          diagnosis,
          notes,
        }),
      });
      if (!res.ok) throw new Error("Error al guardar historial");
      setDiagnosis("");
      setNotes("");
      onSuccess();
      onClose();
    } catch (err) {
      setError("No se pudo guardar el historial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase
      open={open}
      title="Registrar Historial Médico"
      onClose={onClose}
      widthClass="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Diagnóstico</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-1"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Notas</label>
          <textarea
            className="w-full border rounded px-3 py-2 mt-1"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

const RecordModal: React.FC<{
  open: boolean;
  onClose: () => void;
  patientId: number | null;
  date: string | null;
  onSuccess: () => void;
}> = ({ open, onClose, patientId, date, onSuccess }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;
  if (!patientId || !date) {
    return (
      <ModalBase
        open={true}
        title="Falta información de la cita"
        onClose={onClose}
      >
        <button
          type="button"
          className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 mt-2"
          onClick={onClose}
        >
          Cerrar
        </button>
      </ModalBase>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "http://localhost:4000/api/diabetic-foot-records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            patientId,
            date: date.slice(0, 10), 
            description,
          }),
        }
      );
      if (!res.ok) throw new Error("Error al guardar el record");
      setDescription("");
      onSuccess();
      onClose();
    } catch (err) {
      setError("No se pudo guardar el record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase
      open={open}
      title="Registrar Record de la Cita"
      onClose={onClose}
      widthClass="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            className="w-full border rounded px-3 py-2 mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

const FinalizeModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onFinalize: () => void;
}> = ({ open, onClose, onFinalize }) => {
  if (!open) return null;
  return (
    <ModalBase
      open={open}
      title="¿Finalizar cita?"
      onClose={onClose}
      widthClass="max-w-md"
    >
      <div className="space-y-5">
        <p className="text-gray-700 text-lg">
          ¿Deseas marcar la cita como finalizada?
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Omitir
          </button>
          <button
            className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
            onClick={onFinalize}
          >
            Finalizar cita
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

interface TodayAppt {
  id: number;
  patientId: number;
  date: string;
  type: string;
  status: string;
  location?: string | null;
  room?: string | null;
  meetingLink?: string | null; 
  Patient?: {
    User?: {
      name?: string;
    };
  };
}

const statusColor: Record<string, string> = {
  activa: "bg-green-100 text-green-700",
  programada: "bg-blue-100 text-blue-700",
  pendiente: "bg-yellow-100 text-yellow-700",
  finalizada: "bg-gray-100 text-gray-700",
  cancelada: "bg-red-100 text-red-700",
};

const TodayAppointments: React.FC<{ doctorId: number }> = ({ doctorId }) => {
  const [loading, setLoading] = useState(true);
  const [appts, setAppts] = useState<TodayAppt[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [openRecordModal, setOpenRecordModal] = useState(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);

  const reloadAppointments = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const today = new Date();
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).toISOString();
    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    ).toISOString();

    fetch(
      `http://localhost:4000/api/appointments?doctorId=${doctorId}&start=${start}&end=${end}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAppts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    reloadAppointments();
  }, [doctorId]);

  const handleAttend = (appt: TodayAppt) => {
    setSelectedPatientId(appt.patientId);
    setSelectedDate(appt.date);
    setSelectedAppointmentId(appt.id); 
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalSuccess = () => {
    setOpenModal(false);
    setOpenRecordModal(true);
  };

  const handleRecordModalClose = () => {
    setOpenRecordModal(false);
    setSelectedPatientId(null);
    setSelectedDate(null);

  };

  const handleRecordModalSuccess = () => {
    setOpenRecordModal(false);
    setShowFinalizeModal(true); 
    alert("Record guardado con éxito.");
  };

  const handleFinalize = async () => {
    console.log("Entrando a finalizar cita...", selectedAppointmentId);
    if (!selectedAppointmentId) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:4000/api/appointments/${selectedAppointmentId}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "finalizada" }),
        }
      );
      setShowFinalizeModal(false);
      setSelectedPatientId(null);
      setSelectedDate(null);
      setSelectedAppointmentId(null);
      reloadAppointments();
    } catch (err) {
      alert("No se pudo finalizar la cita.");
      setShowFinalizeModal(false);
      setSelectedPatientId(null);
      setSelectedDate(null);
      setSelectedAppointmentId(null);
    }
  };

  const handleFinalizeClose = () => {
    setShowFinalizeModal(false);
    setSelectedPatientId(null);
    setSelectedDate(null);
    setSelectedAppointmentId(null); 
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-red-600" /> Citas de hoy
      </h3>

      {loading ? (
        <div className="text-gray-500 text-sm">Cargando...</div>
      ) : appts.length === 0 ? (
        <div className="text-gray-500 text-sm">No tienes citas hoy.</div>
      ) : (
        <div className="space-y-3">
          {appts.map((c) => {
            const d = new Date(c.date);
            const hour = d.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const showButton =
              c.status === "programada" || c.status === "activa";

            return (
              <div
                key={c.id}
                className="border rounded-lg p-4 hover:shadow-sm transition bg-white flex flex-col gap-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2">
                    <span
                      className={`text-sm px-2 py-0.5 rounded font-medium ${
                        c.type === "virtual"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-pink-50 text-pink-700 border border-pink-200"
                      }`}
                    >
                      {c.type === "virtual" ? "Virtual" : "Presencial"}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold capitalize ${
                        statusColor[c.status] || "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {d.toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-700 flex flex-col gap-1">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> {hour}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {c?.Patient?.User?.name ? (
                      <>
                        Paciente:{" "}
                        <span className="font-semibold">
                          {c.Patient.User.name}
                        </span>
                      </>
                    ) : (
                      `Paciente #${c.patientId}`
                    )}
                  </div>
                  {c.type !== "virtual" && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {c.location || "Centro médico"}{" "}
                      {c.room ? `- ${c.room}` : ""}
                    </div>
                  )}
                  {c.type === "virtual" &&
                    (c.status === "programada" || c.status === "activa") && (
                      <div className="flex items-center mt-2">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-xl transition font-semibold"
                          onClick={() => window.open(c.meetingLink!, "_blank")}
                          disabled={!c.meetingLink}
                        >
                          Conectarse a la cita
                        </button>
                      </div>
                    )}

                  {showButton && (
                    <div className="flex justify-end mt-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-xl transition font-semibold"
                        onClick={() => handleAttend(c)}
                      >
                        Atender
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openModal && (
        <MedicalHistoryModal
          open={openModal}
          onClose={handleModalClose}
          patientId={selectedPatientId}
          onSuccess={handleModalSuccess}
        />
      )}

      {openRecordModal && (
        <RecordModal
          open={openRecordModal}
          onClose={handleRecordModalClose}
          patientId={selectedPatientId}
          date={selectedDate}
          onSuccess={handleRecordModalSuccess}
        />
      )}

      {showFinalizeModal && (
        <FinalizeModal
          open={showFinalizeModal}
          onClose={handleFinalizeClose}
          onFinalize={handleFinalize}
        />
      )}
    </div>
  );
};

export default TodayAppointments;
