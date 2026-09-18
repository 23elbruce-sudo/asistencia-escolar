import type { Student, Teacher, Group, Subject, Schedule, Period } from "@/types";
import { PERIODS } from "./periods";

export const MOCK_TEACHER: Teacher = {
  id: "t1",
  employee_code: "DOC001",
  full_name: "Javier Sánchez González",
  short_name: "J. Sánchez",
  is_active: true,
  created_at: new Date().toISOString(),
};

export const MOCK_GROUP: Group = {
  id: "g1",
  grade: 2,
  letter: "A",
  name: "2° A",
};

export const MOCK_SUBJECT: Subject = {
  id: "s1",
  name: "Historia",
  short_name: "Hist.",
};

export const MOCK_STUDENTS: Student[] = [
  { id: "1", student_code: "2026001", full_name: "Ana García López", group_id: "g1", is_active: true },
  { id: "2", student_code: "2026002", full_name: "Carlos Mendoza Ruiz", group_id: "g1", is_active: true },
  { id: "3", student_code: "2026003", full_name: "Diana Fernández Soto", group_id: "g1", is_active: true },
  { id: "4", student_code: "2026004", full_name: "Eduardo Ramírez Cruz", group_id: "g1", is_active: true },
  { id: "5", student_code: "2026005", full_name: "Fernanda Torres Vargas", group_id: "g1", is_active: true },
  { id: "6", student_code: "2026006", full_name: "Gabriel Jiménez Peña", group_id: "g1", is_active: true },
  { id: "7", student_code: "2026007", full_name: "Helena Castillo Mora", group_id: "g1", is_active: true },
  { id: "8", student_code: "2026008", full_name: "Iván Herrera Luna", group_id: "g1", is_active: true },
  { id: "9", student_code: "2026009", full_name: "Julia Morales Ríos", group_id: "g1", is_active: true },
  { id: "10", student_code: "2026010", full_name: "Kevin Paredes Núñez", group_id: "g1", is_active: true },
];

/** Crea un horario de demo para el periodo actual (si existe) */
export function getMockCurrentSchedule(period: Period | null, dayOfWeek: number | null): Schedule | null {
  if (!period || !dayOfWeek) return null;

  return {
    id: "sch1",
    teacher_id: MOCK_TEACHER.id,
    group_id: MOCK_GROUP.id,
    subject_id: MOCK_SUBJECT.id,
    day_of_week: dayOfWeek,
    period_id: period.id,
    academic_year: "2026-2027",
    is_active: true,
    teacher: MOCK_TEACHER,
    group: MOCK_GROUP,
    subject: MOCK_SUBJECT,
    period,
  };
}
