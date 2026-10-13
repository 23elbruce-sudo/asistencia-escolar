"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAdminRole, getSecondAdmin } from "@/lib/roles";

export default function AdminEntrarPage() {
  const router = useRouter();

  const enterDirector = () => {
    setAdminRole("director");
    router.push("/admin");
  };

  const enterSegundo = () => {
    const s = getSecondAdmin();
    if (!s || !s.active || !s.name.trim()) {
      alert(
        "El Director aún no ha asignado un segundo administrador activo.\n\nEntra como Director → Segundo administrador → asígnalo."
      );
      return;
    }
    setAdminRole("segundo");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-primary-800 to-primary-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-xl font-bold text-primary-800">CCA</span>
          </div>
          <h1 className="text-xl font-bold text-white">CCA Asistencia Escolar</h1>
          <p className="text-primary-200 text-sm mt-1">Acceso administración</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
          <p className="text-sm text-slate-600 text-center mb-2">
            ¿Quién entra? (demo: sin contraseña todavía)
          </p>

          <button
            onClick={enterDirector}
            className="w-full py-4 px-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 text-left"
          >
            <span className="block text-base">Director escolar</span>
            <span className="block text-xs text-primary-100 font-normal mt-1">
              Control total · alumnos, docentes, horarios, asignar segundo admin
            </span>
          </button>

          <button
            onClick={enterSegundo}
            className="w-full py-4 px-4 bg-slate-100 text-slate-800 font-semibold rounded-xl hover:bg-slate-200 text-left border border-slate-200"
          >
            <span className="block text-base">Entrar con mi usuario</span>
            <span className="block text-xs text-slate-500 font-normal mt-1">
              Consulta, dashboard y reportes (sin gestionar alumnos ni docentes)
            </span>
          </button>

          <Link
            href="/"
            className="block text-center text-sm text-slate-400 hover:text-slate-600 pt-2"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
