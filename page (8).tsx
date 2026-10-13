"use client";

import { useState } from "react";
import { GROUP_NAMES } from "@/lib/school-data";

type StudentRow = {
  id: string;
  name: string;
  code: string;
  group: string;
  absent: number;
  late: number;
};

const STUDENTS: StudentRow[] = [
  { id: "1", name: "Ana García López", code: "2026001", group: "1° A", absent: 1, late: 0 },
  { id: "2", name: "Carlos Mendoza Ruiz", code: "2026002", group: "1° A", absent: 1, late: 2 },
  { id: "3", name: "Diana Fernández Soto", code: "2026003", group: "1° B", absent: 0, late: 1 },
  { id: "4", name: "Eduardo Ramírez Cruz", code: "2026004", group: "1° B", absent: 3, late: 0 },
  { id: "5", name: "Helena Castillo Mora", code: "2026007", group: "3° A", absent: 4, late: 1 },
  { id: "6", name: "Julia Morales Ríos", code: "2026009", group: "3° A", absent: 2, late: 2 },
  { id: "7", name: "Iván Herrera Luna", code: "2026008", group: "2° B", absent: 0, late: 0 },
];

const DETAIL: Record<string, { date: string; subject: string; status: "A" | "T" }[]> = {
  "4": [
    { date: "2026-09-15", subject: "Historia", status: "A" },
    { date: "2026-09-16", subject: "Matemáticas", status: "A" },
    { date: "2026-09-18", subject: "Español", status: "A" },
  ],
  "5": [
    { date: "2026-09-15", subject: "Historia", status: "A" },
    { date: "2026-09-16", subject: "Ciencias", status: "A" },
    { date: "2026-09-17", subject: "Inglés", status: "T" },
    { date: "2026-09-18", subject: "Historia", status: "A" },
    { date: "2026-09-19", subject: "Matemáticas", status: "A" },
  ],
};

export default function HistorialAlumnoPage() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("Todos");
  const [selected, setSelected] = useState<StudentRow | null>(null);

  const filtered = STUDENTS.filter((s) => {
    const g = group === "Todos" || s.group === group;
    const q =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search);
    return g && q;
  });

  const detail = selected ? DETAIL[selected.id] || [] : [];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Historial por alumno</h1>
      <p className="text-slate-500 text-sm mb-6">
        Consulta de faltas y tardanzas · Útil para seguimiento y tutores · Datos de demo
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar nombre o matrícula..."
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm"
        />
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
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

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Alumno</th>
                <th className="text-center px-2 py-2 font-medium">A</th>
                <th className="text-center px-2 py-2 font-medium">T</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`cursor-pointer hover:bg-slate-50 ${
                    selected?.id === s.id ? "bg-primary-50" : ""
                  }`}
                >
                  <td className="px-3 py-2">
                    <p className="font-medium text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-400">
                      {s.code} · {s.group}
                    </p>
                  </td>
                  <td className="text-center text-danger-600 font-semibold">{s.absent}</td>
                  <td className="text-center text-warning-600 font-semibold">{s.late}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 min-h-[200px]">
          {!selected ? (
            <p className="text-sm text-slate-400 text-center py-10">
              Selecciona un alumno para ver el detalle
            </p>
          ) : (
            <>
              <h2 className="font-semibold text-slate-800">{selected.name}</h2>
              <p className="text-xs text-slate-500 mb-3">
                {selected.code} · {selected.group} · Ausencias: {selected.absent} · Tardanzas:{" "}
                {selected.late}
              </p>
              {detail.length === 0 ? (
                <p className="text-sm text-slate-500">Sin detalle de excepciones en la demo.</p>
              ) : (
                <ul className="space-y-2">
                  {detail.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm border border-slate-100 rounded-lg px-3 py-2"
                    >
                      <span>
                        {d.date} · {d.subject}
                      </span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          d.status === "A"
                            ? "bg-slate-300 text-slate-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {d.status === "A" ? "Ausente" : "Tardanza"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-slate-400 mt-4">
                En el sistema real aquí saldrán todos los registros del ciclo activo.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
