// =====================================================
// Tipos principales del Sistema de Asistencia Escolar
// =====================================================

export type AdminRole = "principal" | "limited";

export type AttendanceStatus = "present" | "absent" | "late";

export type SessionStatus = "pending" | "open" | "closed";

export interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
}

export interface Teacher {
  id: string;
  employee_code: string | null;
  full_name: string;
  short_name: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Device {
  id: string;
  teacher_id: string;
  device_token: string;
  device_name: string | null;
  activated_at: string;
  last_seen_at: string | null;
  is_active: boolean;
}

export interface Group {
  id: string;
  grade: 1 | 2 | 3;
  letter: "A" | "B";
  name: string;
}

export interface Student {
  id: string;
  student_code: string | null;
  full_name: string;
  group_id: string;
  is_active: boolean;
}

export interface Subject {
  id: string;
  name: string;
  short_name: string | null;
}

export interface Period {
  id: number;
  start_time: string;
  end_time: string;
  name: string;
}

export interface Schedule {
  id: string;
  teacher_id: string;
  group_id: string;
  subject_id: string;
  day_of_week: number;
  period_id: number;
  academic_year: string;
  is_active: boolean;
  teacher?: Teacher;
  group?: Group;
  subject?: Subject;
  period?: Period;
}

export interface AttendanceSession {
  id: string;
  schedule_id: string;
  teacher_id: string;
  group_id: string;
  subject_id: string;
  period_id: number;
  session_date: string;
  status: SessionStatus;
  opened_at: string | null;
  closed_at: string | null;
  registered_by_device_id: string | null;
  teacher?: Teacher;
  group?: Group;
  subject?: Subject;
  period?: Period;
  records?: AttendanceRecord[];
}

export interface AttendanceRecord {
  id: string;
  session_id: string;
  student_id: string;
  status: AttendanceStatus;
  marked_at: string | null;
  student?: Student;
}

export interface AuditLog {
  id: string;
  table_name: string;
  record_id: string;
  action: "update" | "create" | "delete";
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  changed_by: string;
  reason: string;
  created_at: string;
}

export interface ActivationCode {
  id: string;
  teacher_id: string;
  code: string;
  expires_at: string;
  used_at: string | null;
}

export interface CurrentClass {
  schedule: Schedule;
  session: AttendanceSession | null;
  students: Student[];
  records: AttendanceRecord[];
  period: Period;
  isActive: boolean;
}

export interface TeacherContext {
  teacher: Teacher;
  device: Device;
  currentClass: CurrentClass | null;
  nextClass: Schedule | null;
}
