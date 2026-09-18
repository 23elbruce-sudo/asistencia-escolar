"use client";

import { useState } from "react";

type Device = {
  id: string;
  teacher: string;
  deviceName: string;
  activatedAt: string;
  lastSeen: string;
  active: boolean;
};

type ActivationCode = {
  code: string;
  teacher: string;
  expiresAt: string;
};

const DEMO_DEVICES: Device[] = [
  { id: "1", teacher: "Javier Sánchez González", deviceName: "iPhone de Javier", activatedAt: "2026-09-01", lastSeen: "Hoy 07:12", active: true },
  { id: "2", teacher: "María López Hernández", deviceName: "Samsung Galaxy", activatedAt: "2026-09-02", lastSeen: "Hoy 07:05", active: true },
  { id: "3", teacher: "Ana Ruiz Morales", deviceName: "iPad 9", activatedAt: "2026-09-03", lastSeen: "Ayer 14:40", active: true },
  { id: "4", teacher: "Carlos Méndez Soto", deviceName: "Motorola G", activatedAt: "2026-09-05", lastSeen: "Hoy 06:58", active: true },
  { id: "5", teacher: "Luis Fernando Torres", deviceName: "Xiaomi Redmi", activatedAt: "2026-09-08", lastSeen: "Hoy 07:15", active: true },
];

const TEACHERS_WITHOUT_DEVICE = [
  "Roberto Hernández Díaz",
  "Patricia Gómez Vargas",
  "Elena Ramírez Cruz",
  "Diego Morales Peña",
];

export default function DispositivosPage() {
  const [devices, setDevices] = useState(DEMO_DEVICES);
  const [showGenerate, setShowGenerate] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [generatedCode, setGeneratedCode] = useState<ActivationCode | null>(null);

  const generateCode = () => {
    if (!selectedTeacher) return;
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15);
    setGeneratedCode({
      code,
      teacher: selectedTeacher,
      expiresAt: expires.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    });
  };

  const revokeDevice = (id: string) => {
    if (!confirm("¿Desvincular este dispositivo? El docente tendrá que activar uno nuevo.")) return;
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dispositivos</h1>
          <p className="text-slate-500 text-sm mt-1">
            {devices.length} dispositivos vinculados · Genera códigos para activar nuevos
          </p>
        </div>
        <button
          onClick={() => {
            setShowGenerate(true);
            setGeneratedCode(null);
            setSelectedTeacher("");
          }}
          className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Generar código de activación
        </button>
      </div>

      {/* Modal generar código */}
      {showGenerate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Generar código de activación
            </h2>

            {!generatedCode ? (
              <>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Selecciona el docente
                </label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm mb-4 focus:outline-none focus:border-primary-500"
                >
                  <option value="">— Elegir docente —</option>
                  {TEACHERS_WITHOUT_DEVICE.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowGenerate(false)}
                    className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={generateCode}
                    disabled={!selectedTeacher}
                    className="flex-1 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 disabled:opacity-50"
                  >
                    Generar código
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-2">
                  Código para <strong>{generatedCode.teacher}</strong>
                </p>
                <div className="bg-slate-100 rounded-xl py-6 mb-3">
                  <p className="text-4xl font-mono font-bold tracking-widest text-primary-800">
                    {generatedCode.code}
                  </p>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Válido hasta las {generatedCode.expiresAt} (15 minutos)
                </p>
                <p className="text-sm text-slate-600 mb-4">
                  El docente debe abrir la app → Activar dispositivo → escribir este código.
                </p>
                <button
                  onClick={() => setShowGenerate(false)}
                  className="w-full py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700"
                >
                  Listo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lista de dispositivos */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Docente</th>
                <th className="text-left px-4 py-3 font-medium">Dispositivo</th>
                <th className="text-left px-4 py-3 font-medium">Activado</th>
                <th className="text-left px-4 py-3 font-medium">Último uso</th>
                <th className="text-right px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {devices.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{d.teacher}</td>
                  <td className="px-4 py-3 text-slate-600">{d.deviceName}</td>
                  <td className="px-4 py-3 text-slate-500">{d.activatedAt}</td>
                  <td className="px-4 py-3 text-slate-500">{d.lastSeen}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => revokeDevice(d.id)}
                      className="text-danger-600 text-xs font-medium hover:underline"
                    >
                      Desvincular
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {devices.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            No hay dispositivos vinculados.
          </div>
        )}
      </div>

      {/* Docentes sin dispositivo */}
      {TEACHERS_WITHOUT_DEVICE.length > 0 && (
        <div className="mt-6 bg-warning-50 border border-warning-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-warning-700 mb-2">
            Docentes sin dispositivo vinculado
          </h3>
          <ul className="text-sm text-warning-600 space-y-1">
            {TEACHERS_WITHOUT_DEVICE.map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
