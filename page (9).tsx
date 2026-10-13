"use client";

import { useState } from "react";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const PERIODS = [
  { id: 1, label: "1 · 07:00–07:50" },
  { id: 2, label: "2 · 07:55–08:45" },
  { id: 3, label: "3 · 08:50–09:40" },
  { id: 4, label: "4 · 10:00–10:50" },
  { id: 5, label: "5 · 10:55–11:45" },
  { id: 6, label: "6 · 11:50–12:40" },
  { id: 7, label: "7 · 13:00–13:50" },
  { id: 8, label: "8 · 13:55–14:45" },
];

type ScheduleEntry = {
  id: string;
  day: number;
  period: number;
  teacher: string;
  subject: string;
  group: string;
};

const DEMO_SCHEDULES: ScheduleEntry[] = [
  { id: "1", day: 1, period: 1, teacher: "J. Sánchez", subject: "Historia", group: "2° A" },
  { id: "2", day: 1, period: 1, teacher: "M. López", subject: "Matemáticas", group: "1° B" },
  { id: "3", day: 1, period: 2, teacher: "A. Ruiz", subject: "Ciencias", group: "2° B" },
  { id: "4", day: 1, period: 2, teacher: "R. Hernández", subject: "Español", group: "3° A" },
  { id: "5", day: 1, period: 3, teacher: "C. Méndez", subject: "Inglés", group: "1° A" },
  { id: "6", day: 1, period: 4, teacher: "J. Sánchez", subject: "Historia", group: "3° B" },
  { id: "7", day: 2, period: 1, teacher: "M. López", subject: "Matemáticas", group: "2° A" },
  { id: "8", day: 2, period: 1, teacher: "P. Gómez", subject: "Geografía", group: "1° A" },
  { id: "9", day: 2, period: 2, teacher: "L. Torres", subject: "Física", group: "3° A" },
  { id: "10", day: 2, period: 3, teacher: "S. Herrera", subject: "Química", group: "2° B" },
  { id: "11", day: 3, period: 1, teacher: "J. Sánchez", subject: "Historia", group: "1° B" },
  { id: "12", day: 3, period: 2, teacher: "A. Ruiz", subject: "Ciencias", group: "3° B" },
  { id: "13", day: 4, period: 1, teacher: "C. Méndez", subject: "Inglés", group: "2° A" },
  { id: "14", day: 4, period: 4, teacher: "M. López", subject: "Matemáticas", group: "3° A" },
  { id: "15", day: 5, period: 1, teacher: "R. Hernández", subject: "Español", group: "1° A" },
  { id: "16", day: 5, period: 5, teacher: "J. Sánchez", subject: "Historia", group: "2° B" },
];

export default function HorariosPage() {
  const [dayFilter, setDayFilter] = useState(1);
  const [groupFilter, setGroupFilter] = useState("Todos");
  const [teacherFilter, setTeacherFilter] = useState("Todos");

  const groups = ["Todos", "1° A", "1° B", "2° A", "2° B", "3° A", "3° B"];
  const teachers = ["Todos", ...Array.from(new Set(DEMO_SCHEDULES.map((s) => s.teacher)))];

  const filtered = DEMO_SCHEDULES.filter((s) => {
    if (s.day !== dayFilter) return false;
    if (groupFilter !== "Todos" && s.group !== groupFilter) return false;
    if (teacherFilter !== "Todos" && s.teacher !== teacherFilter) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Horarios</h1>
          <p className="text-slate-500 text-sm mt-1">
            Asignaciones de docente + día + periodo → grupo + materia
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50">
            Importar Excel
          </button>
          <button className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700">
            + Nueva asignación
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setDayFilter(i + 1)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              dayFilter === i + 1
                ? "bg-primary-600 text-white"
                : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
        >
          {groups.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={teacherFilter}
          onChange={(e) => setTeacherFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
        >
          {teachers.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Tabla de horarios del día */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Periodo</th>
                <th className="text-left px-4 py-3 font-medium">Docente</th>
                <th className="text-left px-4 py-3 font-medium">Materia</th>
                <th className="text-left px-4 py-3 font-medium">Grupo</th>
                <th className="text-right px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PERIODS.map((p) => {
                const entries = filtered.filter((s) => s.period === p.id);
                if (entries.length === 0) {
                  return (
                    <tr key={p.id} className="text-slate-300">
                      <td className="px-4 py-3">{p.label}</td>
                      <td className="px-4 py-3" colSpan={4}>— sin clase —</td>
                    </tr>
                  );
                }
                return entries.map((e, idx) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    {idx === 0 ? (
                      <td className="px-4 py-3 font-medium text-slate-600" rowSpan={entries.length}>
                        {p.label}
                      </td>
                    ) : null}
                    <td className="px-4 py-3 text-slate-800">{e.teacher}</td>
                    <td className="px-4 py-3 text-slate-600">{e.subject}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">
                        {e.group}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-primary-600 text-xs font-medium hover:underline mr-2">
                        Editar
                      </button>
                      <button className="text-danger-600 text-xs font-medium hover:underline">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
