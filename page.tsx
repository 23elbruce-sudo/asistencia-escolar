"use client";

import { useState } from "react";
import { GROUP_NAMES } from "@/lib/school-data";

type Student = {
  id: string;
  code: string;
  name: string;
  group: string;
};

const INITIAL: Student[] = [
  { id: "1", code: "2026001", name: "Ana García López", group: "1° A" },
  { id: "2", code: "2026002", name: "Carlos Mendoza Ruiz", group: "1° A" },
  { id: "3", code: "2026003", name: "Diana Fernández Soto", group: "1° B" },
  { id: "4", code: "2026004", name: "Eduardo Ramírez Cruz", group: "1° B" },
  { id: "5", code: "2026005", name: "Fernanda Torres Vargas", group: "2° A" },
  { id: "6", code: "2026006", name: "Gabriel Jiménez Peña", group: "2° A" },
  { id: "7", code: "2026007", name: "Helena Castillo Mora", group: "2° B" },
  { id: "8", code: "2026008", name: "Iván Herrera Luna", group: "2° B" },
  { id: "9", code: "2026009", name: "Julia Morales Ríos", group: "3° A" },
  { id: "10", code: "2026010", name: "Kevin Paredes Núñez", group: "3° A" },
  { id: "11", code: "2026011", name: "Laura Sánchez Ortiz", group: "3° B" },
  { id: "12", code: "2026012", name: "Miguel Ángel Ruiz", group: "3° B" },
];

export default function AlumnosPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL);
  const [groupFilter, setGroupFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", name: "", group: "1° A" });
  const [message, setMessage] = useState("");

  const flash = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  const filtered = students.filter((s) => {
    const matchGroup = groupFilter === "Todos" || s.group === groupFilter;
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search);
    return matchGroup && matchSearch;
  });

  const openAdd = () => {
    setForm({ code: "", name: "", group: "1° A" });
    setEditId(null);
    setShowAdd(true);
  };

  const openEdit = (s: Student) => {
    setForm({ code: s.code, name: s.name, group: s.group });
    setEditId(s.id);
    setShowAdd(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.code.trim()) {
      alert("Matrícula y nombre son obligatorios");
      return;
    }
    if (editId) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editId
            ? { ...s, code: form.code.trim(), name: form.name.trim(), group: form.group }
            : s
        )
      );
      flash("Alumno actualizado (demo)");
    } else {
      if (students.some((s) => s.code === form.code.trim())) {
        alert("Esa matrícula ya existe");
        return;
      }
      setStudents((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          code: form.code.trim(),
          name: form.name.trim(),
          group: form.group,
        },
      ]);
      flash("Alumno agregado (demo)");
    }
    setShowAdd(false);
  };

  const remove = (id: string, name: string) => {
    if (!confirm(`¿Eliminar a ${name}?`)) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
    flash("Alumno eliminado (demo)");
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Alumnos</h1>
          <p className="text-slate-500 text-sm mt-1">
            {students.length} alumnos · 6 grupos fijos (1°–3° A/B)
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"
        >
          + Agregar alumno
        </button>
      </div>

      {message && (
        <div className="mb-4 px-4 py-3 bg-success-50 border border-success-200 text-success-700 text-sm rounded-lg">
          {message}
        </div>
      )}

      <p className="text-xs text-slate-400 mb-4">
        Demo: los cambios se ven aquí; al recargar se restablecen.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o matrícula..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500"
        />
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white"
        >
          <option value="Todos">Todos los grupos</option>
          {GROUP_NAMES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {editId ? "Editar alumno" : "Agregar alumno"}
            </h2>
            <label className="block text-sm font-medium text-slate-700 mb-1">Matrícula</label>
            <input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-3"
              placeholder="2026013"
            />
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-3"
              placeholder="Nombre del alumno"
            />
            <label className="block text-sm font-medium text-slate-700 mb-1">Grupo</label>
            <select
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-4 bg-white"
            >
              {GROUP_NAMES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={save}
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
                <th className="text-left px-4 py-3 font-medium">Matrícula</th>
                <th className="text-left px-4 py-3 font-medium">Nombre</th>
                <th className="text-left px-4 py-3 font-medium">Grupo</th>
                <th className="text-right px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{s.code}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-600">
                      {s.group}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEdit(s)}
                      className="text-primary-600 text-xs font-medium hover:underline mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => remove(s.id, s.name)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-danger-600 hover:bg-danger-50"
                      title="Eliminar alumno"
                      aria-label="Eliminar"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">No se encontraron alumnos.</div>
        )}
      </div>
    </div>
  );
}
