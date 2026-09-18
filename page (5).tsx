"use client";

import { useState } from "react";

const GROUPS = ["Toda la escuela", "1° A", "1° B", "2° A", "2° B", "3° A", "3° B"];

const WEEKLY_DATA = [
  { day: "Lun", absent: 12, late: 8 },
  { day: "Mar", absent: 9, late: 11 },
  { day: "Mié", absent: 15, late: 6 },
  { day: "Jue", absent: 7, late: 9 },
  { day: "Vie", absent: 18, late: 14 },
];

const GROUP_STATS = [
  { group: "1° A", absent: 22, late: 15, classes: 40 },
  { group: "1° B", absent: 18, late: 12, classes: 40 },
  { group: "2° A", absent: 31, late: 20, classes: 40 },
  { group: "2° B", absent: 14, late: 9, classes: 40 },
  { group: "3° A", absent: 25, late: 17, classes: 40 },
  { group: "3° B", absent: 19, late: 11, classes: 40 },
];

export default function EstadisticasPage() {
  const [period, setPeriod] = useState<"semana" | "mes">("semana");
  const [group, setGroup] = useState("Toda la escuela");

  const totalAbsent = GROUP_STATS.reduce((a, g) => a + g.absent, 0);
  const totalLate = GROUP_STATS.reduce((a, g) => a + g.late, 0);
  const maxVal = Math.max(...WEEKLY_DATA.map((d) => Math.max(d.absent, d.late)));

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Estadísticas</h1>
        <p className="text-slate-500 text-sm mt-1">
          Ausencias y tardanzas separadas. Datos de demostración.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("semana")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === "semana"
                ? "bg-primary-600 text-white"
                : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            Semanal
          </button>
          <button
            onClick={() => setPeriod("mes")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === "mes"
                ? "bg-primary-600 text-white"
                : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            Mensual
          </button>
        </div>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary-500"
        >
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Totales */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Ausencias</p>
          <p className="text-3xl font-bold text-danger-600 mt-1">{totalAbsent}</p>
          <p className="text-xs text-slate-400 mt-1">
            {period === "semana" ? "Esta semana" : "Este mes"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Tardanzas</p>
          <p className="text-3xl font-bold text-warning-600 mt-1">{totalLate}</p>
          <p className="text-xs text-slate-400 mt-1">
            {period === "semana" ? "Esta semana" : "Este mes"}
          </p>
        </div>
      </div>

      {/* Gráfica simple por día */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
        <h2 className="font-semibold text-slate-700 mb-4">
          Por día de la semana
        </h2>
        <div className="flex items-end gap-3 h-40">
          {WEEKLY_DATA.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 items-end justify-center h-28">
                <div
                  className="w-3 sm:w-4 bg-danger-400 rounded-t"
                  style={{ height: `${(d.absent / maxVal) * 100}%` }}
                  title={`Ausencias: ${d.absent}`}
                />
                <div
                  className="w-3 sm:w-4 bg-warning-400 rounded-t"
                  style={{ height: `${(d.late / maxVal) * 100}%` }}
                  title={`Tardanzas: ${d.late}`}
                />
              </div>
              <span className="text-xs text-slate-500">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-danger-400 rounded" /> Ausencias
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-warning-400 rounded" /> Tardanzas
          </span>
        </div>
      </div>

      {/* Por grupo */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-700">Por grupo</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Grupo</th>
                <th className="text-center px-4 py-3 font-medium">Ausencias</th>
                <th className="text-center px-4 py-3 font-medium">Tardanzas</th>
                <th className="text-center px-4 py-3 font-medium">Clases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {GROUP_STATS.map((g) => (
                <tr key={g.group} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{g.group}</td>
                  <td className="px-4 py-3 text-center text-danger-600 font-medium">
                    {g.absent}
                  </td>
                  <td className="px-4 py-3 text-center text-warning-600 font-medium">
                    {g.late}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-500">{g.classes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
