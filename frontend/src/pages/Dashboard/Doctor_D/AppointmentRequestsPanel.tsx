import React, { useEffect, useState } from "react";
import { User, Calendar, Clock } from "lucide-react";

interface AppointmentRequest {
  id: number;
  patientId: number;
  message: string;
  preferredDate?: string;
  status: string; // "pendiente" | "concluida" | ...
  createdAt: string;
  updatedAt: string;
}

const statusColor: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-700",
  programada: "bg-blue-100 text-blue-700",
  activa: "bg-green-100 text-green-700",
  finalizada: "bg-gray-100 text-gray-700",
  cancelada: "bg-red-100 text-red-700",
  concluida: "bg-emerald-100 text-emerald-700",
};

const AppointmentRequestsPanel: React.FC = () => {
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [patientNames, setPatientNames] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false); 
  const [modalReq, setModalReq] = useState<AppointmentRequest | null>(null);
  const [patientNameForModal, setPatientNameForModal] = useState<string>("");

  const [form, setForm] = useState({
    type: "presencial", // "presencial" | "virtual"
    date: "",
    hour: "",
    location: "",
    room: "",
    notes: "",
  });

  const token = localStorage.getItem("token") || "";
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();
  const doctorId = currentUser?.id;

  const reloadRequests = () => {
    setLoading(true);
    fetch(`http://localhost:4000/api/appointment-requests`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    reloadRequests();
  }, []);

  useEffect(() => {
    const uniqueIds = Array.from(new Set(requests.map((r) => r.patientId)));
    const missing = uniqueIds.filter((id) => !(id in patientNames));
    if (missing.length === 0) return;
    Promise.all(
      missing.map((id) =>
        fetch(`http://localhost:4000/api/patients/by-patient-id/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => ({
            id,
            name: data?.User?.name as string | undefined,
          }))
          .catch(() => ({ id, name: undefined }))
      )
    ).then((pairs) => {
      const dict = { ...patientNames };
      pairs.forEach(({ id, name }) => {
        if (name) dict[id] = name;
      });
      setPatientNames(dict);
    });
  }, [requests]);

  const openModal = (req: AppointmentRequest) => {
    setModalReq(req);
    setPatientNameForModal(
      patientNames[req.patientId] || `Paciente #${req.patientId}`
    );
    setForm({
      type: "presencial",
      date: req.preferredDate?.slice(0, 10) || "",
      hour: req.preferredDate?.slice(11, 16) || "",
      location: "",
      room: "",
      notes: "",
    });
    setOpen(true);
  };

  const closeModal = () => {
    if (saving) return; 
    setOpen(false);
    setModalReq(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalReq) return;
    if (!doctorId) {
      alert("No se encontró el doctorId (usuario no autenticado).");
      return;
    }
    if (!form.date || !form.hour) {
      alert("Fecha y hora son obligatorias.");
      return;
    }
    if (form.type === "presencial" && (!form.location || !form.room)) {
      alert("Lugar y consultorio son obligatorios para citas presenciales.");
      return;
    }

    const fullDate = `${form.date}T${form.hour}:00`;
    const body: any = {
      patientId: modalReq.patientId,
      doctorId,
      date: fullDate,
      type: form.type,
      notes: form.notes || undefined,
    };
    if (form.type === "presencial") {
      body.status = "programada";
      body.location = form.location;
      body.room = form.room;
    }

    try {
      setSaving(true);

      const create = await fetch(`http://localhost:4000/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const createdJson = await create.json();
      if (!create.ok) {
        console.error("Error creando cita:", createdJson);
        throw new Error(createdJson?.message || "No se pudo crear la cita");
      }


      const upd = await fetch(
        `http://localhost:4000/api/appointment-requests/${modalReq.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "concluida" }),
        }
      );
      const updJson = await upd.json();
      if (!upd.ok) {
        console.error("Error actualizando solicitud:", updJson);

        alert(
          "La cita se creó, pero no se pudo marcar la solicitud como concluida."
        );
      }

      await new Promise((r) => setTimeout(r, 400)); 
      setOpen(false);
      setModalReq(null);
      reloadRequests();
    } catch (err: any) {
      alert(`Error al guardar: ${err?.message || "desconocido"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-yellow-600" /> Solicitudes de cita
      </h3>

      {open && modalReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl shadow-2xl w-[92vw] max-w-xl p-6"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                Agendar cita para {patientNameForModal}
              </h2>
              <p className="text-xs text-gray-500">
                La solicitud incluye fecha sugerida:{" "}
                {modalReq.preferredDate
                  ? new Date(modalReq.preferredDate).toLocaleString()
                  : "—"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm">
                Tipo
                <select
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                >
                  <option value="presencial">Presencial</option>
                  <option value="virtual">Virtual</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm">
                  Fecha
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    required
                  />
                </label>
                <label className="text-sm">
                  Hora
                  <input
                    type="time"
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={form.hour}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, hour: e.target.value }))
                    }
                    required
                  />
                </label>
              </div>

              {form.type === "presencial" && (
                <>
                  <label className="text-sm">
                    Lugar
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 mt-1"
                      value={form.location}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, location: e.target.value }))
                      }
                      required
                    />
                  </label>
                  <label className="text-sm">
                    Consultorio
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 mt-1"
                      value={form.room}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, room: e.target.value }))
                      }
                      required
                    />
                  </label>
                </>
              )}

              <label className="text-sm">
                Notas
                <textarea
                  className="w-full border rounded px-3 py-2 mt-1"
                  rows={3}
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200"
                onClick={closeModal}
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-60"
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>

            {saving && (
              <div className="absolute inset-0 rounded-2xl bg-white/70 backdrop-blur-[1px] flex items-center justify-center text-sm font-medium">
                Procesando… por favor espera
              </div>
            )}
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500 text-sm">Cargando solicitudes…</div>
      ) : requests.length === 0 ? (
        <div className="text-gray-500 text-sm">
          No tienes solicitudes pendientes.
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const dateValue = req.preferredDate
              ? new Date(req.preferredDate)
              : null;
            const dateString =
              dateValue && !isNaN(dateValue.getTime())
                ? dateValue.toLocaleDateString()
                : "Fecha no disponible";
            const hourString =
              dateValue && !isNaN(dateValue.getTime())
                ? dateValue.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

            return (
              <div
                key={req.id}
                className="border rounded-lg p-4 hover:shadow-sm transition bg-white flex flex-col gap-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2">
                    <span className="text-sm px-2 py-0.5 rounded font-medium bg-pink-50 text-pink-700 border border-pink-200">
                      Presencial
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold capitalize ${
                        statusColor[req.status] || "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{dateString}</span>
                </div>

                <div className="text-sm text-gray-700 flex flex-col gap-1">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> {hourString}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {patientNames[req.patientId] ? (
                      <>
                        Paciente:
                        <span className="font-semibold ml-1">
                          {patientNames[req.patientId]}
                        </span>
                      </>
                    ) : (
                      <>Paciente #{req.patientId}</>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {req.message}
                  </div>
                </div>

                {req.status === "pendiente" && (
                  <button
                    className="ml-auto px-4 py-1 mt-2 rounded bg-green-600 text-white font-semibold"
                    onClick={() => openModal(req)}
                  >
                    Agendar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentRequestsPanel;
