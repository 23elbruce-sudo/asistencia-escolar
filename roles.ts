/** Roles de administración – demo en localStorage */

export type AdminRole = "director" | "segundo";

export type SecondAdmin = {
  name: string;
  active: boolean;
};

const ROLE_KEY = "cca_admin_role";
const SECOND_KEY = "cca_segundo_admin";

export function getAdminRole(): AdminRole | null {
  if (typeof window === "undefined") return null;
  const r = localStorage.getItem(ROLE_KEY);
  if (r === "director" || r === "segundo") return r;
  return null;
}

export function setAdminRole(role: AdminRole) {
  localStorage.setItem(ROLE_KEY, role);
}

export function clearAdminRole() {
  localStorage.removeItem(ROLE_KEY);
}

export function getSecondAdmin(): SecondAdmin | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SECOND_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SecondAdmin;
  } catch {
    return null;
  }
}

export function setSecondAdmin(data: SecondAdmin) {
  localStorage.setItem(SECOND_KEY, JSON.stringify(data));
}

/** Menú del Director: control total */
export const DIRECTOR_NAV = [
  { href: "/admin", label: "Inicio", icon: "🏠" },
  { href: "/admin/asistencia", label: "Asistencia en vivo", icon: "📋" },
  { href: "/admin/notificaciones", label: "Notificaciones", icon: "🔔" },
  { href: "/admin/alumnos", label: "Alumnos", icon: "👨‍🎓" },
  { href: "/admin/historial-alumno", label: "Historial alumno", icon: "📁" },
  { href: "/admin/docentes", label: "Docentes", icon: "👨‍🏫" },
  { href: "/admin/horarios", label: "Horarios", icon: "🗓️" },
  { href: "/admin/segundo-admin", label: "Segundo administrador", icon: "👤" },
  { href: "/admin/dispositivos", label: "Dispositivos", icon: "📱" },
  { href: "/admin/importar", label: "Importar Excel", icon: "📥" },
  { href: "/admin/estadisticas", label: "Estadísticas", icon: "📊" },
  { href: "/admin/reportes", label: "Reportes", icon: "📄" },
  { href: "/admin/bitacora", label: "Bitácora", icon: "📝" },
  { href: "/admin/ciclo", label: "Ciclo escolar", icon: "📅" },
];

/** Menú del segundo admin: consulta, dashboard y reportes */
export const SEGUNDO_NAV = [
  { href: "/admin", label: "Inicio", icon: "🏠" },
  { href: "/admin/asistencia", label: "Asistencia en vivo", icon: "📋" },
  { href: "/admin/notificaciones", label: "Notificaciones", icon: "🔔" },
  { href: "/admin/historial-alumno", label: "Historial alumno", icon: "📁" },
  { href: "/admin/estadisticas", label: "Estadísticas", icon: "📊" },
  { href: "/admin/reportes", label: "Reportes", icon: "📄" },
];
