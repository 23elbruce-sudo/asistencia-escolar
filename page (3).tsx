"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminRole } from "@/lib/roles";
import { getCiclos, setCicloActivo, setCiclos, type CicloEscolar } from "@/lib/ciclo";

export default function CicloPage() {
  const router = useRouter();
  const [ciclos, setList] = useState<CicloEscolar[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (getAdminRole() !== "director") {
      router.replace("/admin");
      return;
    }
    setList(getCiclos());
    setAllowed(true);
  }, [router]);

  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 2500);
  };

  const activate = (id: string) => {
    setCicloActivo(id);
    setList(getCiclos());
    flash("Ciclo activo actualizado (demo en este navegador)");
  };

  const add = () => {
    const label = newLabel.trim();
    if (!label) return;
    if (ciclos.some((c) => c.id === label || c.label === label)) {
      alert("Ese ciclo ya existe");
      return;
    }
    const next = [...ciclos.map((c) => ({ ...c, active: false })), { id: label, label, active: true }];
    setCiclos(next);
    setList(next);
    setNewLabel("");
    flash("Ciclo agregado y activado");
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
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Ciclo escolar</h1>
      <p className="text-slate-500 text-sm mb-6">
        Evita mezclar asistencias de un año con otro. Solo el Director gestiona el ciclo. Demo en
        este navegador.
      </p>

      {msg && (
        <div className="mb-4 px-4 py-3 bg-success-50 border border-success-200 text-success-700 text-sm rounded-lg">
          {msg}
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 divide-y mb-6">
        {ciclos.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium text-slate-800">{c.label}</p>
              {c.active && (
                <span className="text-xs text-success-600 font-semibold">Ciclo activo</span>
              )}
            </div>
            {!c.active && (
              <button
                onClick={() => activate(c.id)}
                className="text-sm text-primary-600 font-medium hover:underline"
              >
                Activar
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Nuevo ciclo</label>
        <div className="flex gap-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Ej. 2027-2028"
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm"
          />
          <button
            onClick={add}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
