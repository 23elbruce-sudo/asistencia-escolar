"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminRole, getSecondAdmin, setSecondAdmin } from "@/lib/roles";

export default function SegundoAdminPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState("");
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (getAdminRole() !== "director") {
      router.replace("/admin");
      return;
    }
    const s = getSecondAdmin();
    if (s) {
      setName(s.name);
      setActive(s.active);
    }
    setAllowed(true);
  }, [router]);

  const save = () => {
    if (!name.trim()) {
      alert("Escribe el nombre de la persona");
      return;
    }
    setSecondAdmin({ name: name.trim(), active });
    setMessage("Segundo administrador guardado (demo: se guarda en este navegador)");
    setTimeout(() => setMessage(""), 3000);
  };

  const remove = () => {
    if (!confirm("¿Quitar al segundo administrador?")) return;
    setSecondAdmin({ name: "", active: false });
    setName("");
    setActive(false);
    setMessage("Segundo administrador eliminado");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!allowed) {
    return (
      <div className="p-8 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Segundo administrador</h1>
      <p className="text-slate-500 text-sm mb-6">
        Solo el Director asigna a esta persona. Esa persona verá su <strong>nombre</strong> en el
        panel, no la leyenda “Segundo administrador”. Podrá ver dashboard, asistencia, estadísticas
        y reportes; no podrá cargar alumnos ni docentes.
      </p>

      {message && (
        <div className="mb-4 px-4 py-3 bg-success-50 border border-success-200 text-success-700 text-sm rounded-lg">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. María López Hernández"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="rounded border-slate-300"
          />
          Acceso activo
        </label>

        <div className="flex gap-3 pt-2">
          <button
            onClick={save}
            className="flex-1 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700"
          >
            Guardar
          </button>
          <button
            onClick={remove}
            className="px-4 py-3 border border-danger-200 text-danger-600 font-medium rounded-xl hover:bg-danger-50"
          >
            Quitar
          </button>
        </div>
      </div>
    </div>
  );
}
