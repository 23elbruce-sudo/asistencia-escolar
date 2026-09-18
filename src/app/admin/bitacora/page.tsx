"use client";

import { useState } from "react";

type AuditEntry = {
  id: string;
  date: string;
  time: string;
  admin: string;
  student: string;
  group: string;
  classInfo: string;
  oldStatus: string;
  newStatus: string;
  reason: string;
};

const DEMO_LOG: AuditEntry[] = [
  {
    id: "1",
    date: "2026-09-17",
    time: "14:32",
    admin: "Admin Principal",
    student: "Carlos Mendoza Ruiz",
    group: "1° A",
    classInfo: "Matemáticas · 17/09 · 2do periodo",
    oldStatus: "Ausente",
    newStatus: "Presente",
    reason: "Error del docente: el alumno sí estaba, llegó por la puerta trasera.",
  },
  {
    id: "2",
    date: "2026-09-16",
    time: "11:05",
    admin: "Admin Principal",
    student: "Helena Castillo Mora",
    group: "3° A",
    classInfo: "Español · 16/09 · 4to periodo",
    oldStatus: "Presente",
    newStatus: "Tardanza",
    reason: "El alumno llegó 15 minutos tarde; el docente lo marcó presente por error.",
  },
  {
    id: "3",
    date: "2026-09-15",
    time: "09:48",
    admin: "Admin Principal",
    student: "Diana Fernández Soto",
    group: "1° B",
    classInfo: "Historia · 15/09 · 1er periodo",
    oldStatus: "Ausente",
    newStatus: "Presente",
    reason: "Justificante médico presentado posteriormente.",
  },
  {
    id: "4",
    date: "2026-09-12",
    time: "16:20",
    admin: "Admin Principal",
    student: "Iván Herrera Luna",
    group: "2° B",
    classInfo: "Ciencias · 12/09 · 6to periodo",
    oldStatus: "Tardanza",
    newStatus: "Ausente",
    reason: "Revisión de cámara: el alumno no ingresó al salón.",
  },
  {
    id: "5",
    date: "2026-09-10",
    time: "13:15",
    admin: "Admin Principal",
    student: "Ana García López",
    group: "1° A",
    classInfo: "Inglés · 10/09 · 5to periodo",
    oldStatus: "Presente",
    newStatus: "Ausente",
    reason: "Corrección solicitada por el docente (confusión de nombres).",
  },
];

export default function BitacoraPage() {
  const [search, setSearch] = useState("");

  const filtered = DEMO_LOG.filter(
    (e) =>
      search === "" ||
      e.student.toLowerCase().includes(search.toLowerCase()) ||
      e.admin.toLowerCase().includes(search.toLowerCase()) ||
      e.reason.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s: string) => {
    if (s === "Presente") return "text-success-600 bg-success-50";
    if (s === "Ausente") return "text-danger-600 bg-danger-50";
    return "text-warning-600 bg-warning-50";
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Bitácora de correcciones</h1>
        <p className="text-slate-500 text-sm mt-1">
          Historial de cambios realizados por el administrador principal sobre registros cerrados
        </p>
      </div>

      <input
        type="text"
        placeholder="Buscar por alumno, administrador o motivo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-6 focus:outline-none focus:border-primary-500"
      />

      <div className="space-y-4">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <p className="font-semibold text-slate-800">{entry.student}</p>
                <p className="text-sm text-slate-500">
                  {entry.group} · {entry.classInfo}
                </p>
              </div>
              <p className="text-xs text-slate-400 whitespace-nowrap">
                {entry.date} · {entry.time}
              </p>
            </div>

            <div className="flex items-center gap-2 mb-3 text-sm">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(entry.oldStatus)}`}>
                {entry.oldStatus}
              </span>
              <span className="text-slate-400">→</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(entry.newStatus)}`}>
                {entry.newStatus}
              </span>
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">
                Corregido por <strong className="text-slate-600">{entry.admin}</strong>
              </p>
              <p className="text-sm text-slate-700">{entry.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">
          No se encontraron registros.
        </div>
      )}
    </div>
  );
}
