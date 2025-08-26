import React, { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
  onClose,
  children,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-transparent cursor-pointer"
      onClick={onClose}
    />
    <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full z-10 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-colors"
        style={{ fontSize: 32, lineHeight: 1, padding: 2 }}
        aria-label="Cerrar"
      >
        <X className="w-8 h-8" />
      </button>
      {children}
    </div>
  </div>
);

interface LabResult {
  id: number;
  date: string;
  description: string;
  resultFile: string;
}

const LabResultsModal: React.FC<{
  show: boolean;
  onClose: () => void;
  patientId: number;
}> = ({ show, onClose, patientId }) => {
  const [results, setResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!show) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(`http://localhost:4000/api/lab-results?patientId=${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [show, patientId]);

  if (!show) return null;
  return (
    <Modal onClose={onClose}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Resultados de Laboratorio
      </h3>
      {loading ? (
        <div className="text-gray-500">Cargando...</div>
      ) : results.length === 0 ? (
        <div className="text-gray-500">No se encontraron resultados.</div>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
          {results.map((result) => (
            <li
              key={result.id}
              className="py-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-gray-700">
                  {result.description}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(result.date).toLocaleDateString("es-CO")}
                </div>
              </div>
              <a
                href={result.resultFile}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
              >
                Ver PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

interface PatientHeroProps {
  patientId: number;
}

const PatientHero: React.FC<PatientHeroProps> = ({ patientId }) => {
  const [tratamientos, setTratamientos] = useState<number>(0);
  const [consultas, setConsultas] = useState<number>(0);
  const [evaluaciones, setEvaluaciones] = useState<number>(0);
  const [presencial, setPresencial] = useState<any | null>(null);
  const [virtual, setVirtual] = useState<any | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [presencialInfo, setPresencialInfo] = useState<any | null>(null);
  const [showLabModal, setShowLabModal] = useState(false); 
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestLoading(true);
    setRequestSuccess(false);
    setRequestError(null);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "http://localhost:4000/api/appointment-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            patientId,
            message: requestMessage,
            preferredDate: preferredDate
              ? new Date(preferredDate).toISOString()
              : null,
          }),
        }
      );
      if (res.ok) {
        setRequestSuccess(true);
        setRequestMessage("");
        setPreferredDate("");
      } else {
        const data = await res.json();
        setRequestError(data?.error || "Error enviando la solicitud.");
      }
    } catch (err: any) {
      setRequestError("Error de conexión");
    }
    setRequestLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      `http://localhost:4000/api/patient-treatments?patientId=${patientId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setTratamientos(Array.isArray(data) ? data.length : 0))
      .catch(() => setTratamientos(0));

    fetch(`http://localhost:4000/api/appointments?patientId=${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setConsultas(Array.isArray(data) ? data.length : 0);

        const now = new Date();
        const proximaPresencial = data.find(
          (cita: any) =>
            cita.type === "presencial" &&
            new Date(cita.date) >= now &&
            cita.status === "programada"
        );
        const proximaVirtual = data.find(
          (cita: any) =>
            cita.type === "virtual" &&
            new Date(cita.date) >= now &&
            cita.status === "programada"
        );
        setPresencial(proximaPresencial || null);
        setVirtual(proximaVirtual || null);
      })
      .catch(() => {
        setConsultas(0);
        setPresencial(null);
        setVirtual(null);
      });

    fetch(
      `http://localhost:4000/api/diabetic-foot-records?patientId=${patientId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setEvaluaciones(Array.isArray(data) ? data.length : 0))
      .catch(() => setEvaluaciones(0));
  }, [patientId]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Panel de Control Personal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Tratamientos</p>
              <p className="text-2xl font-bold text-blue-800">{tratamientos}</p>
              <p className="text-blue-600 text-xs">Activos</p>
            </div>
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
        </div>
        {/* Consultas */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Consultas</p>
              <p className="text-2xl font-bold text-green-800">{consultas}</p>
              <p className="text-green-600 text-xs">Este mes</p>
            </div>
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        {/* Evaluaciones */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">
                Evaluaciones
              </p>
              <p className="text-2xl font-bold text-purple-800">
                {evaluaciones}
              </p>
              <p className="text-purple-600 text-xs">Pie diabético</p>
            </div>
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-300 rounded-lg p-4 transition-all duration-200 group"
            onClick={() => setShowLabModal(true)}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                Ver Resultados
              </p>
            </div>
          </button>

          <button
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200 group"
            onClick={() => presencial && setPresencialInfo(presencial)}
            disabled={!presencial}
            style={presencial ? {} : { opacity: 0.7, cursor: "not-allowed" }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                Cita Presencial
              </p>
            </div>
          </button>

          <button
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 rounded-lg p-4 transition-all duration-200 group"
            onClick={() => virtual && setShowVideoModal(true)}
            disabled={!virtual}
            style={virtual ? {} : { opacity: 0.7, cursor: "not-allowed" }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">VideoConsulta</p>
            </div>
          </button>

          <button
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 rounded-lg p-4 transition-all duration-200 group"
            onClick={() => setShowRequestModal(true)}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6 0A9 9 0 11 3 12a9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                Solicitar Cita Urgente
              </p>
            </div>
          </button>
        </div>
      </div>

      <LabResultsModal
        show={showLabModal}
        onClose={() => setShowLabModal(false)}
        patientId={patientId}
      />

      {presencialInfo && (
        <Modal onClose={() => setPresencialInfo(null)}>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-blue-900">Cita Presencial</h2>
            <p>
              <b>Fecha:</b> {new Date(presencialInfo.date).toLocaleDateString()}{" "}
              -{" "}
              {new Date(presencialInfo.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>
              <b>Ubicación:</b> {presencialInfo.location}
            </p>
            <p>
              <b>Consultorio:</b> {presencialInfo.room}
            </p>
            {presencialInfo.notes && (
              <p>
                <b>Notas:</b> {presencialInfo.notes}
              </p>
            )}
            <div className="rounded-xl overflow-hidden shadow-lg mt-4 border border-blue-100">
              <iframe
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 12 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  presencialInfo.location
                )}&output=embed`}
                title="Ubicación de la cita"
              ></iframe>
            </div>
          </div>
        </Modal>
      )}
      {showRequestModal && (
        <Modal
          onClose={() => {
            setShowRequestModal(false);
            setRequestSuccess(false);
            setRequestError(null);
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-blue-900">
            Solicitar cita médica
          </h2>
          {requestSuccess ? (
            <div className="text-green-700 font-medium py-6 text-center">
              ¡Solicitud enviada con éxito!
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo o mensaje
                </label>
                <textarea
                  required
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  placeholder="Escribe brevemente tu motivo o síntomas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha preferida (opcional)
                </label>
                <input
                  type="datetime-local"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {requestError && (
                <div className="text-red-600">{requestError}</div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                disabled={requestLoading}
              >
                {requestLoading ? "Enviando..." : "Enviar solicitud"}
              </button>
            </form>
          )}
        </Modal>
      )}

      {virtual && showVideoModal && (
        <Modal onClose={() => setShowVideoModal(false)}>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-green-900">Videoconsulta</h2>
            <p>
              <b>Fecha:</b> {new Date(virtual.date).toLocaleDateString()} -{" "}
              {new Date(virtual.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {virtual.meetingLink && (
              <p>
                <b>Enlace:</b>{" "}
                <a
                  href={virtual.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  {virtual.meetingLink}
                </a>
              </p>
            )}
            {virtual.notes && (
              <p>
                <b>Notas:</b> {virtual.notes}
              </p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PatientHero;
