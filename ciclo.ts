/** Ciclo escolar vigente SEP – por defecto 2026-2027 */

const KEY = "cca_ciclo_escolar";

export type CicloEscolar = {
  id: string;
  label: string;
  active: boolean;
};

/** Ciclo oficial vigente de la app */
export const CICLO_VIGENTE_SEP = "2026-2027";

export const CICLOS_DEFAULT: CicloEscolar[] = [
  { id: "2026-2027", label: "2026-2027 (SEP vigente)", active: true },
  { id: "2025-2026", label: "2025-2026", active: false },
];

export function getCicloActivo(): CicloEscolar {
  if (typeof window === "undefined") {
    return { id: CICLO_VIGENTE_SEP, label: "2026-2027 (SEP vigente)", active: true };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const list = JSON.parse(raw) as CicloEscolar[];
      const active = list.find((c) => c.active);
      if (active) return active;
    }
  } catch {}
  return { id: CICLO_VIGENTE_SEP, label: "2026-2027 (SEP vigente)", active: true };
}

export function getCiclos(): CicloEscolar[] {
  if (typeof window === "undefined") return CICLOS_DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as CicloEscolar[];
  } catch {}
  return CICLOS_DEFAULT;
}

export function setCiclos(list: CicloEscolar[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function setCicloActivo(id: string) {
  const list = getCiclos().map((c) => ({ ...c, active: c.id === id }));
  setCiclos(list);
}
