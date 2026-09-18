"use client";

import { useState } from "react";

type ReportConfig = {
  type: "semanal" | "mensual";
  group: string;
  from: string;
  to: string;
};

export default function ReportesPage() {
  const [config, setConfig] = useState<ReportConfig>({
    type: "semanal",
    group: "Toda la escuela",
    from: "2026-09-08",
    to: "2026-09-12",
  });
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const groups = ["Toda la escuela", "1° A", "1° B", "2° A", "2° B", "3° A", "3° B"];

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1000));
    setGenerating(false);
    setGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Reportes</h1>
        <p className="text-slate-500 text-sm mt-1">
          Genera, visualiza, imprime o guarda reportes en PDF
        </p>
      </div>

      {/* Configuración */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 print:hidden">
        <h2 className="font-semibold text-slate-700 mb-4">Configurar reporte</h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Tipo</label>
            <div className="flex gap-2">
              <button
                onClick={() => setConfig({ ...config, type: "semanal" })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  config.type === "semanal"
                    ? "bg-primary-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Semanal
              </button>
              <button
                onClick={() => setConfig({ ...config, type: "mensual" })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  config.type === "mensual"
                    ? "bg-primary-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Mensual
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Grupo</label>
            <select
              value={config.group}
              onChange={(e) => setConfig({ ...config, group: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
            >
              {groups.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Desde</label>
            <input
              type="date"
              value={config.from}
              onChange={(e) => setConfig({ ...config, from: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Hasta</label>
            <input
              type="date"
              value={config.to}
              onChange={(e) => setConfig({ ...config, to: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50"
        >
          {generating ? "Generando..." : "Generar reporte"}
        </button>
      </div>

      {/* Vista previa del reporte */}
      {generated && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Acciones */}
          <div className="flex gap-2 p-4 border-b border-slate-100 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700"
            >
              Imprimir
            </button>
            <button
              onClick={() => alert("En la versión final se descargará un PDF real.")}
              className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
            >
              Guardar PDF
            </button>
            <button
              onClick={() => setGenerated(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50"
            >
              Cerrar
            </button>
          </div>

          {/* Contenido del reporte (imprimible) */}
          <div className="p-6 md:p-8" id="report-content">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Colegio Cristóbal de las Américas
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Reporte de Asistencia {config.type === "semanal" ? "Semanal" : "Mensual"}
              </p>
              <p className="text-sm text-slate-500">
                {config.group} · {config.from} al {config.to}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-slate-800">40</p>
                <p className="text-xs text-slate-500">Clases</p>
              </div>
              <div className="bg-danger-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-danger-600">18</p>
                <p className="text-xs text-slate-500">Ausencias</p>
              </div>
              <div className="bg-warning-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-warning-600">12</p>
                <p className="text-xs text-slate-500">Tardanzas</p>
              </div>
            </div>

            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-2 font-semibold text-slate-700">Alumno</th>
                  <th className="text-center py-2 font-semibold text-slate-700">Grupo</th>
                  <th className="text-center py-2 font-semibold text-slate-700">Ausencias</th>
                  <th className="text-center py-2 font-semibold text-slate-700">Tardanzas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Ana García López", group: "1° A", absent: 2, late: 1 },
                  { name: "Carlos Mendoza Ruiz", group: "1° A", absent: 0, late: 3 },
                  { name: "Diana Fernández Soto", group: "1° B", absent: 4, late: 0 },
                  { name: "Eduardo Ramírez Cruz", group: "2° A", absent: 1, late: 2 },
                  { name: "Fernanda Torres Vargas", group: "2° A", absent: 3, late: 1 },
                  { name: "Gabriel Jiménez Peña", group: "2° B", absent: 0, late: 0 },
                  { name: "Helena Castillo Mora", group: "3° A", absent: 5, late: 2 },
                  { name: "Iván Herrera Luna", group: "3° B", absent: 1, late: 1 },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="py-2 text-slate-800">{row.name}</td>
                    <td className="py-2 text-center text-slate-500">{row.group}</td>
                    <td className="py-2 text-center text-danger-600 font-medium">{row.absent || "—"}</td>
                    <td className="py-2 text-center text-warning-600 font-medium">{row.late || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-xs text-slate-400 text-center mt-6">
              Generado el {new Date().toLocaleDateString("es-MX")} · Sistema de Asistencia Escolar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
