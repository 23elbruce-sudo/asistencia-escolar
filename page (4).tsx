"use client";

import { useState } from "react";
import Link from "next/link";

type Teacher = {
  id: string;
  code: string;
  name: string;
  devices: number;
  active: boolean;
};

const INITIAL: Teacher[] = [
  { id: "1", code: "DOC001", name: "Javier Sánchez González", devices: 1, active: true },
  { id: "2", code: "DOC002", name: "María López Hernández", devices: 1, active: true },
  { id: "3", code: "DOC003", name: "Roberto Hernández Díaz", devices: 0, active: true },
  { id: "4", code: "DOC004", name: "Ana Ruiz Morales", devices: 1, active: true },
  { id: "5", code: "DOC005", name: "Carlos Méndez Soto", devices: 1, active: true },
  { id: "6", code: "DOC006", name: "Patricia Gómez Vargas", devices: 0, active: true },
  { id: "7", code: "DOC007", name: "Luis Fernando Torres", devices: 1, active: true },
  { id: "8", code: "DOC008", name: "Elena Ramírez Cruz", devices: 0, active: false },
  { id: "9", code: "DOC009", name: "Miguel Ángel Castillo", devices: 1, active: true },
  { id: "10", code: "DOC010", name: "Sofía Herrera Luna", devices: 1, active: true },
  { id: "11", code: "DOC011", name: "Diego Morales Peña", devices: 0, active: true },
  { id: "12", code: "DOC012", name: "Carmen Núñez Ortiz", devices: 1, active: true },
  { id: "13", code: "DOC013", name: "Andrés Vargas Ríos", devices: 1, active: true },
];

export default function DocentesPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState("");

  const flash = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  const removeTeacher = (id: string, name: string) => {
    if (!confirm(`¿Eliminar a ${name}? (solo en esta demo; al recargar vuelve a aparecer)`)) return;
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    flash("Docente eliminado de la lista (demo)");
  };

  const toggleActive = (id: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
    flash("Estado actualizado (demo)");
  };

  const unlinkDevice = (id: string) => {
    if (!confirm("¿Desvincular el dispositivo de este docente?")) return;
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, devices: 0 } : t))
    );
    flash("Dispositivo desvinculado (demo)");
  };

  const addTeacher = () => {
    if (!newName.trim()) {
      alert("Escribe el nombre del docente");
      return;
    }
    const code = newCode.trim() || `DOC${String(teachers.length + 1).padStart(3, "0")}`;
    setTeachers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        code,
        name: newName.trim(),
        devices: 0,
        active: true,
      },
    ]);
    setNewName("");
    setNewCode("");
    setShowAdd(false);
    flash("Docente agregado (demo)");
  };

  const saveEdit = () => {
    if (!editId || !editName.trim()) return;
    setTeachers((prev) =>
      prev.map((t) => (t.id === editId ? { ...t, name: editName.trim() } : t))
    );
    setEditId(null);
    flash("Nombre actualizado (demo)");
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Docentes</h1>
          <p className="text-slate-500 text-sm mt-1">
            {teachers.length} docentes ·{" "}
            {teachers.filter((t) => t.devices > 0).length} con dispositivo vinculado
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/dispositivos"
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Generar código de activación
          </Link>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            + Agregar docente
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 px-4 py-3 bg-success-50 border border-success-200 text-success-700 text-sm rounded-lg">
          {message}
        </div>
      )}

      <p className="text-xs text-slate-400 mb-4">
        Demo: los cambios se ven aquí, pero al recargar la página se restablecen. Cuando conectemos la base de datos quedarán guardados.
      </p>

      {/* Modal agregar */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Agregar docente</h2>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-3 focus:outline-none focus:border-primary-500"
              placeholder="Ej. Juan Pérez García"
            />
            <label className="block text-sm font-medium text-slate-700 mb-1">Código (opcional)</label>
            <input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-4 focus:outline-none focus:border-primary-500"
              placeholder="DOC014"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={addTeacher}
                className="flex-1 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal editar */}
      {editId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Editar docente</h2>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-4 focus:outline-none focus:border-primary-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setEditId(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Código</th>
                <th className="text-left px-4 py-3 font-medium">Nombre</th>
                <th className="text-center px-4 py-3 font-medium">Dispositivos</th>
                <th className="text-center px-4 py-3 font-medium">Estado</th>
                <th className="text-right px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{t.code}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{t.name}</td>
                  <td className="px-4 py-3 text-center">
                    {t.devices > 0 ? (
                      <span className="inline-flex items-center gap-1 text-success-600 font-medium">
                        <span className="w-2 h-2 bg-success-500 rounded-full" />
                        {t.devices}
                      </span>
                    ) : (
                      <span className="text-slate-400">Sin vincular</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActive(t.id)}
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        t.active
                          ? "bg-success-100 text-success-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {t.active ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setEditId(t.id);
                        setEditName(t.name);
                      }}
                      className="text-primary-600 text-xs font-medium hover:underline"
                    >
                      Editar
                    </button>
                    {t.devices > 0 && (
                      <button
                        onClick={() => unlinkDevice(t.id)}
                        className="text-warning-600 text-xs font-medium hover:underline"
                      >
                        Desvincular
                      </button>
                    )}
                    {t.devices === 0 && (
                      <Link
                        href="/admin/dispositivos"
                        className="text-success-600 text-xs font-medium hover:underline"
                      >
                        Vincular
                      </Link>
                    )}
                    <button
                      onClick={() => removeTeacher(t.id, t.name)}
                      className="text-danger-600 text-xs font-medium hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
