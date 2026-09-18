import type { Period } from "@/types";

/** Periodos fijos de la jornada escolar */
export const PERIODS: Period[] = [
  { id: 1, start_time: "07:00", end_time: "07:50", name: "1er periodo" },
  { id: 2, start_time: "07:55", end_time: "08:45", name: "2do periodo" },
  { id: 3, start_time: "08:50", end_time: "09:40", name: "3er periodo" },
  { id: 4, start_time: "10:00", end_time: "10:50", name: "4to periodo" },
  { id: 5, start_time: "10:55", end_time: "11:45", name: "5to periodo" },
  { id: 6, start_time: "11:50", end_time: "12:40", name: "6to periodo" },
  { id: 7, start_time: "13:00", end_time: "13:50", name: "7mo periodo" },
  { id: 8, start_time: "13:55", end_time: "14:45", name: "8vo periodo" },
];

/**
 * Devuelve el periodo actual según la hora.
 * Retorna null si está en receso o fuera de horario.
 */
export function getCurrentPeriod(now: Date = new Date()): Period | null {
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const current = `${hours}:${minutes}`;

  return (
    PERIODS.find((p) => current >= p.start_time && current <= p.end_time) ||
    null
  );
}

/**
 * Día de la semana (1=Lunes ... 5=Viernes).
 * Domingo y sábado devuelven null.
 */
export function getCurrentDayOfWeek(now: Date = new Date()): number | null {
  const day = now.getDay(); // 0=Domingo, 1=Lunes ... 6=Sábado
  if (day === 0 || day === 6) return null;
  return day;
}
