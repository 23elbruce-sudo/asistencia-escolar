/** Datos fijos de la escuela – no se inventan grupos */

export const GROUPS = [
  { id: "g1a", grade: 1, letter: "A", name: "1° A" },
  { id: "g1b", grade: 1, letter: "B", name: "1° B" },
  { id: "g2a", grade: 2, letter: "A", name: "2° A" },
  { id: "g2b", grade: 2, letter: "B", name: "2° B" },
  { id: "g3a", grade: 3, letter: "A", name: "3° A" },
  { id: "g3b", grade: 3, letter: "B", name: "3° B" },
] as const;

export const GROUP_NAMES = GROUPS.map((g) => g.name);

export const PERIODS = [
  { id: 1, start: "07:00", end: "07:50", name: "1er periodo" },
  { id: 2, start: "07:55", end: "08:45", name: "2do periodo" },
  { id: 3, start: "08:50", end: "09:40", name: "3er periodo" },
  { id: 4, start: "10:00", end: "10:50", name: "4to periodo" },
  { id: 5, start: "10:55", end: "11:45", name: "5to periodo" },
  { id: 6, start: "11:50", end: "12:40", name: "6to periodo" },
  { id: 7, start: "13:00", end: "13:50", name: "7mo periodo" },
  { id: 8, start: "13:55", end: "14:45", name: "8vo periodo" },
] as const;

export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;
