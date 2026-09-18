"use client";

import Link from "next/link";

const SUMMARY_CARDS = [
  {
    title: "Asistencia en vivo",
    description: "Ver qué está pasando ahora en cada clase",
    href: "/admin/asistencia",
    color: "bg-blue-500",
    icon: "📋",
  },
  {
    title: "Alumnos",
    description: "Gestionar alumnos y grupos",
    href: "/admin/alumnos",
    color: "bg-emerald-500",
    icon: "👨‍🎓",
  },
  {
    title: "Docentes",
    description: "Docentes y dispositivos vinculados",
    href: "/admin/docentes",
    color: "bg-violet-500",
    icon: "👨‍🏫",
  },
  {
    title: "Horarios",
    description: "Asignaciones de clase",
    href: "/admin/horarios",
    color: "bg-amber-500",
    icon: "🗓️",
  },
  {
    title: "Estadísticas",
    description: "Ausencias y tardanzas semanales/mensuales",
    href: "/admin/estadisticas",
    color: "bg-rose-500",
    icon: "📊",
  },
  {
    title: "Reportes",
    description: "Generar e imprimir PDF",
    href: "/admin/reportes",
    color: "bg-cyan-500",
    icon: "📄",
  },
];

const DEMO_LIVE = [
  { teacher: "J. Sánchez", group: "2° A", subject: "Historia", status: "Registrada", absent: 1, late: 2 },
  { teacher: "M. López", group: "1° B", subject: "Matemáticas", status: "Registrada", absent: 0, late: 1 },
  { teacher: "R. Hernández", group: "3° A", subject: "Español", status: "Pendiente", absent: 0, late: 0 },
  { teacher: "A. Ruiz", group: "2° B", subject: "Ciencias", status: "Registrada", absent: 3, late: 0 },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Panel de administración</h1>
        <p className="text-slate-500 mt-1">
          Supervisión y gestión del Colegio Cristóbal de las Américas
        </p>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-700">
            Asistencia de hoy (demo)
          </h2>
          <Link
            href="/admin/asistencia"
            className="text-sm text-primary-600 font-medium hover:underline"
          >
            Ver todo →
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Docente</th>
                  <th className="text-left px-4 py-3 font-medium">Grupo</th>
                  <th className="text-left px-4 py-3 font-medium">Materia</th>
                  <th className="text-left px-4 py-3 font-medium">Estado</th>
                  <th className="text-center px-4 py-3 font-medium">Aus.</th>
                  <th className="text-center px-4 py-3 font-medium">Tard.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEMO_LIVE.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {row.teacher}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.group}</td>
                    <td className="px-4 py-3 text-slate-600">{row.subject}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          row.status === "Registrada"
                            ? "bg-success-100 text-success-700"
                            : "bg-warning-100 text-warning-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-danger-600 font-medium">
                      {row.absent || "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-warning-600 font-medium">
                      {row.late || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUMMARY_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-primary-300 transition-all group"
            >
              <div
                className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center text-white text-lg mb-3`}
              >
                {card.icon}
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-primary-700">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
