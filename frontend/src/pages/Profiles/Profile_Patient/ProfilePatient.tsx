
import React, { useEffect, useState } from "react";
import { User, Edit3, X } from "lucide-react";

interface ProfilePatientProps {
  userId: number;
}

const ProfilePatient: React.FC<ProfilePatientProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [patient, setPatient] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState({
    telefono: "",
    direccion: "",
    identificacion: "",
    tipoId: "",
    fechaNacimiento: "",
    genero: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`/api/patients/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        setUser(data.User || {});
        setLoading(false);
        if (data && data.contactInfo) {
          const [tel = "", dir = "", id = "", tipo = ""] =
            data.contactInfo.split(",");
          setForm((f) => ({
            ...f,
            telefono: tel.trim(),
            direccion: dir.trim(),
            identificacion: id.trim(),
            tipoId: tipo.trim(),
          }));
        }
        if (data && data.clinicalInfo) {
          const matchFecha = data.clinicalInfo.match(/(\d{4}-\d{2}-\d{2})/);
          const matchGenero = data.clinicalInfo.match(
            /Género:\s*([\wáéíóú]+)/i
          );
          setForm((f) => ({
            ...f,
            fechaNacimiento: matchFecha ? matchFecha[1] : "",
            genero: matchGenero ? matchGenero[1] : "",
          }));
        }
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const handleEdit = () => setShowEditModal(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    const contactInfo = [
      form.telefono,
      form.direccion,
      form.identificacion,
      form.tipoId,
    ].join(",");
    const clinicalInfo = `Género: ${form.genero}, Fecha Nacimiento: ${form.fechaNacimiento}`;
    try {
      const res = await fetch(
        `/api/patients/${patient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ contactInfo, clinicalInfo }),
        }
      );
      if (res.ok) window.location.reload();
    } catch {
      alert("Error guardando cambios");
    } finally {
      setSaving(false);
      setShowEditModal(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <span className="text-gray-400">Cargando perfil...</span>
      </div>
    );

  if (!user || !patient)
    return (
      <div className="flex items-center justify-center py-32">
        <span className="text-gray-500">
          No se encontró la información del paciente.
        </span>
      </div>
    );

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-10 mt-6 max-w-full">
      <div className="flex items-center mb-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mr-6 shadow">
          <User className="w-14 h-14 text-[#B71C1C]" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500 text-lg">{user.email}</p>
        </div>
        <div className="ml-auto">
          <button
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-6 py-2 text-base text-gray-700 font-semibold transition"
            onClick={handleEdit}
          >
            <Edit3 className="w-5 h-5" />
            Editar
          </button>
        </div>
      </div>
      <hr className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-lg">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Teléfono</label>
          <p className="text-gray-800">{form.telefono || "Sin info"}</p>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Dirección</label>
          <p className="text-gray-800">{form.direccion || "Sin info"}</p>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Identificación
          </label>
          <p className="text-gray-800">{form.identificacion || "Sin info"}</p>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Tipo de ID</label>
          <p className="text-gray-800">{form.tipoId || "Sin info"}</p>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Fecha de nacimiento
          </label>
          <p className="text-gray-800">{form.fechaNacimiento || "Sin info"}</p>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Género</label>
          <p className="text-gray-800">{form.genero || "Sin info"}</p>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl relative max-w-lg w-full">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
              onClick={() => setShowEditModal(false)}
            >
              <X className="w-7 h-7" />
            </button>
            <h3 className="font-bold text-lg text-gray-800 mb-6">
              Editar Información
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Identificación
                </label>
                <input
                  type="text"
                  name="identificacion"
                  value={form.identificacion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Tipo de ID
                </label>
                <input
                  type="text"
                  name="tipoId"
                  value={form.tipoId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Género
                </label>
                <select
                  name="genero"
                  value={form.genero}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="">Selecciona</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg font-semibold transition"
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePatient;
