"use client";

import { useState } from "react";

const DEMO_STUDENTS = [
  { code: "2026001", name: "Ana García López", group: "1° A" },
  { code: "2026002", name: "Carlos Mendoza Ruiz", group: "1° A" },
  { code: "2026003", name: "Diana Fernández Soto", group: "1° B" },
  { code: "2026004", name: "Eduardo Ramírez Cruz", group: "1° B" },
  { code: "2026005", name: "Fernanda Torres Vargas", group: "2° A" },
  { code: "2026006", name: "Gabriel Jiménez Peña", group: "2° A" },
  { code: "2026007", name: "Helena Castillo Mora", group: "2° B" },
  { code: "2026008", name: "Iván Herrera Luna", group: "2° B" },
  { code: "2026009", name: "Julia Morales Ríos", group: "3° A" },
  { code: "2026010", name: "Kevin Paredes Núñez", group: "3° A" },
  { code: "2026011", name: "Laura Sánchez Ortiz", group: "3° B" },
  { code: "2026012", name: "Miguel Ángel Ruiz", group: "3° B" },
];

const GROUPS = ["Todos", "1° A", "1° B", "2° A", "2° B", "3° A", "3° B"];

export default function AlumnosPage() {
  const [groupFilter, setGroupFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = DEMO_STUDENTS.filter((s) => {
    const matchGroup = groupFilter === "Todos" || s.group === groupFilter;
    const matchSearch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search);
    return matchGroup && matchSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Alumnos</h1>
          <p className="text-slate-500 text-sm mt-1">
            {DEMO_STUDENTS.length} alumnos registrados (demo)
          </p>
        </div>
        <button className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors">
          + Agregar alumno
        </button>
      </div>

      {/* Filtros */}
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
          className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white"
        >
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
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
                <tr key={s.code} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{s.code}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-600">
                      {s.group}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-primary-600 text-xs font-medium hover:underline mr-3">
                      Editar
                    </button>
                    <button className="text-slate-400 text-xs font-medium hover:text-danger-600">
                      Desactivar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            No se encontraron alumnos.
          </div>
        )}
      </div>
    </div>
  );
}
