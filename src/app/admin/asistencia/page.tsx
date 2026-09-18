"use client";

import { useState } from "react";

type SessionRow = {
  id: string;
  teacher: string;
  group: string;
  subject: string;
  period: string;
  status: "Registrada" | "Pendiente" | "Cerrada";
  present: number;
  absent: number;
  late: number;
  total: number;
};

const DEMO_SESSIONS: SessionRow[] = [
  {
    id: "1",
    teacher: "Javier Sánchez González",
    group: "2° A",
    subject: "Historia",
    period: "1er periodo · 07:00–07:50",
    status: "Registrada",
    present: 27,
    absent: 1,
    late: 2,
    total: 30,
  },
  {
    id: "2",
    teacher: "María López Hernández",
    group: "1° B",
    subject: "Matemáticas",
    period: "1er periodo · 07:00–07:50",
    status: "Registrada",
    present: 28,
    absent: 0,
    late: 1,
    total: 29,
  },
  {
    id: "3",
    teacher: "Roberto Hernández Díaz",
    group: "3° A",
    subject: "Español",
    period: "1er periodo · 07:00–07:50",
    status: "Pendiente",
    present: 0,
    absent: 0,
    late: 0,
    total: 28,
  },
  {
    id: "4",
    teacher: "Ana Ruiz Morales",
    group: "2° B",
    subject: "Ciencias",
    period: "1er periodo · 07:00–07:50",
    status: "Registrada",
    present: 25,
    absent: 3,
    late: 0,
    total: 28,
  },
  {
    id: "5",
    teacher: "Carlos Méndez Soto",
    group: "1° A",
    subject: "Inglés",
    period: "2do periodo · 07:55–08:45",
    status: "Pendiente",
    present: 0,
    absent: 0,
    late: 0,
    total: 30,
  },
];

export default function AsistenciaEnVivoPage() {
  const [filter, setFilter] = useState<"all" | "Registrada" | "Pendiente">("all");

  const filtered =
    filter === "all"
      ? DEMO_SESSIONS
      : DEMO_SESSIONS.filter((s) => s.status === filter);

  const stats = {
    total: DEMO_SESSIONS.length,
    registered: DEMO_SESSIONS.filter((s) => s.status === "Registrada").length,
    pending: DEMO_SESSIONS.filter((s) => s.status === "Pendiente").length,
    totalAbsent: DEMO_SESSIONS.reduce((a, s) => a + s.absent, 0),
    totalLate: DEMO_SESSIONS.reduce((a, s) => a + s.late, 0),
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Asistencia en tiempo real</h1>
        <p className="text-slate-500 mt-1">
          Supervisa las clases del día. Los datos se actualizan cuando los docentes registran.
        </p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Clases</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Registradas</p>
          <p className="text-2xl font-bold text-success-600 mt-1">{stats.registered}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Pendientes</p>
          <p className="text-2xl font-bold text-warning-600 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Aus. / Tard.</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            <span className="text-danger-600">{stats.totalAbsent}</span>
            <span className="text-slate-300 mx-1">/</span>
            <span className="text-warning-600">{stats.totalLate}</span>
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {(["all", "Registrada", "Pendiente"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f === "all" ? "Todas" : f}
          </button>
        ))}
      </div>

      {/* Lista de sesiones */}
      <div className="space-y-3">
        {filtered.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      session.status === "Registrada"
                        ? "bg-success-100 text-success-700"
                        : session.status === "Pendiente"
                        ? "bg-warning-100 text-warning-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {session.status}
                  </span>
                  <span className="text-xs text-slate-400">{session.period}</span>
                </div>
                <h3 className="font-semibold text-slate-800">
                  {session.subject} · {session.group}
                </h3>
                <p className="text-sm text-slate-500">{session.teacher}</p>
              </div>

              {session.status === "Registrada" ? (
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-success-600 font-bold text-lg">{session.present}</p>
                    <p className="text-xs text-slate-400">Presentes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-danger-600 font-bold text-lg">{session.absent}</p>
                    <p className="text-xs text-slate-400">Ausentes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-warning-600 font-bold text-lg">{session.late}</p>
                    <p className="text-xs text-slate-400">Tardanzas</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Aún no registrada por el docente
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No hay clases con este filtro.
        </div>
      )}
    </div>
  );
}
