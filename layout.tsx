"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAdminRole,
  getSecondAdmin,
  clearAdminRole,
  DIRECTOR_NAV,
  SEGUNDO_NAV,
  type AdminRole,
} from "@/lib/roles";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Pantalla de entrada al panel: no exigir rol aún
    if (pathname === "/admin/entrar") {
      setReady(true);
      return;
    }
    const r = getAdminRole();
    if (!r) {
      router.replace("/admin/entrar");
      return;
    }
    setRole(r);
    if (r === "director") {
      setDisplayName("Director escolar");
    } else {
      const s = getSecondAdmin();
      setDisplayName(s?.name?.trim() || "Usuario");
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Entrada sin menú lateral
  if (pathname === "/admin/entrar") {
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  const nav = role === "director" ? DIRECTOR_NAV : SEGUNDO_NAV;

  const logout = () => {
    clearAdminRole();
    router.push("/admin/entrar");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-64 bg-primary-900 text-white flex-col">
        <div className="p-5 border-b border-primary-700">
          <h1 className="font-bold text-lg leading-tight">CCA Asistencia Escolar</h1>
          <p className="text-primary-200 text-sm mt-2 font-medium">{displayName}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
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
        <div className="p-4 border-t border-primary-700 space-y-2">
          <button
            onClick={logout}
            className="block w-full text-left text-primary-300 text-sm hover:text-white"
          >
            Cambiar de usuario
          </button>
          <Link href="/" className="block text-primary-300 text-sm hover:text-white">
            ← Volver al inicio
          </Link>
        </div>
      </aside>

      <div className="md:hidden bg-primary-900 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="font-bold text-base">CCA Asistencia</h1>
            <p className="text-primary-200 text-xs">{displayName}</p>
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
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-200"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-3 px-3 py-2.5 text-primary-300 text-sm w-full text-left"
            >
              Cambiar de usuario
            </button>
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

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
