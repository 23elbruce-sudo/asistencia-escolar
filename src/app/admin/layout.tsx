"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Inicio", icon: "🏠" },
  { href: "/admin/asistencia", label: "Asistencia en vivo", icon: "📋" },
  { href: "/admin/alumnos", label: "Alumnos", icon: "👨‍🎓" },
  { href: "/admin/docentes", label: "Docentes", icon: "👨‍🏫" },
  { href: "/admin/horarios", label: "Horarios", icon: "🗓️" },
  { href: "/admin/estadisticas", label: "Estadísticas", icon: "📊" },
  { href: "/admin/reportes", label: "Reportes", icon: "📄" },
  { href: "/admin/importar", label: "Importar Excel", icon: "📥" },
  { href: "/admin/dispositivos", label: "Dispositivos", icon: "📱" },
  { href: "/admin/bitacora", label: "Bitácora", icon: "📝" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - escritorio */}
      <aside className="hidden md:flex md:w-64 bg-primary-900 text-white flex-col">
        <div className="p-5 border-b border-primary-700">
          <h1 className="font-bold text-lg leading-tight">Asistencia Escolar</h1>
          <p className="text-primary-300 text-xs mt-1">
            Colegio Cristóbal de las Américas
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary-700 text-white font-medium"
                    : "text-primary-200 hover:bg-primary-800 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-primary-700">
          <Link
            href="/"
            className="text-primary-300 text-sm hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </aside>

      {/* Header móvil */}
      <div className="md:hidden bg-primary-900 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="font-bold text-base">Panel Admin</h1>
            <p className="text-primary-300 text-xs">Cristóbal de las Américas</p>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-primary-800"
            aria-label="Menú"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <nav className="px-3 pb-4 space-y-1 border-t border-primary-700">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                    active
                      ? "bg-primary-700 text-white font-medium"
                      : "text-primary-200"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-primary-300 text-sm"
            >
              ← Volver al inicio
            </Link>
          </nav>
        )}
      </div>

      {/* Contenido */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
