"use client";

import { useState } from "react";

type Notif = {
  id: string;
  type: "falta" | "clase" | "info";
  title: string;
  detail: string;
  time: string;
  read: boolean;
};

const INITIAL: Notif[] = [
  {
    id: "1",
    type: "clase",
    title: "Clase sin registrar",
    detail: "Historia · 2° A · Periodo 1 (07:00–07:50) · Hoy — el docente no ha guardado asistencia.",
    time: "Hace 20 min",
    read: false,
  },
  {
    id: "2",
    type: "falta",
    title: "Falta reiterada",
    detail: "Helena Castillo Mora (3° A) acumula 3 ausencias esta semana.",
    time: "Hace 1 h",
    read: false,
  },
  {
    id: "3",
    type: "falta",
    title: "Falta reiterada",
    detail: "Eduardo Ramírez Cruz (1° B) acumula 3 ausencias esta semana.",
    time: "Ayer",
    read: true,
  },
  {
    id: "4",
    type: "clase",
    title: "Clase sin registrar",
    detail: "Matemáticas · 1° A · Periodo 4 — ayer quedó como pendiente.",
    time: "Ayer",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Recordatorio",
    detail: "Demo: estas alertas serán automáticas cuando la asistencia se guarde en la base de datos.",
    time: "Sistema",
    read: true,
  },
];

export default function NotificacionesPage() {
  const [items, setItems] = useState(INITIAL);
  const unread = items.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAll = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const icon = (t: Notif["type"]) => {
    if (t === "falta") return "⚠️";
    if (t === "clase") return "📋";
    return "ℹ️";
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notificaciones</h1>
          <p className="text-slate-500 text-sm mt-1">
            {unread > 0 ? `${unread} sin leer` : "Todo al día"} · Demo con datos de ejemplo
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAll}
            className="text-sm text-primary-600 font-medium hover:underline"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.map((n) => (
          <button
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`w-full text-left rounded-xl border p-4 transition-colors ${
              n.read
                ? "bg-white border-slate-200"
                : "bg-primary-50 border-primary-200"
            }`}
          >
            <div className="flex gap-3">
              <span className="text-xl shrink-0">{icon(n.type)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${n.read ? "font-medium text-slate-700" : "font-semibold text-slate-900"}`}>
                    {n.title}
                  </p>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{n.detail}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
