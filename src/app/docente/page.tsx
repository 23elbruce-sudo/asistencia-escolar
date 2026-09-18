"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AttendanceStatus, Period } from "@/types";
import { getCurrentPeriod, getCurrentDayOfWeek } from "@/lib/periods";
import { formatTime } from "@/lib/utils";
import {
  MOCK_TEACHER,
  MOCK_STUDENTS,
  MOCK_SUBJECT,
  MOCK_GROUP,
  getMockCurrentSchedule,
} from "@/lib/mock-data";

type LocalRecord = {
  studentId: string;
  status: AttendanceStatus;
};

export default function DocentePage() {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState(MOCK_TEACHER.full_name);
  const [period, setPeriod] = useState<Period | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<number | null>(null);
  const [records, setRecords] = useState<LocalRecord[]>([]);
  const [sessionStatus, setSessionStatus] = useState<"pending" | "open" | "closed">("open");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  // Datos de la clase actual (demo con datos mock)
  const schedule = getMockCurrentSchedule(period, dayOfWeek);
  const currentClass = {
    subject: schedule?.subject?.name || MOCK_SUBJECT.name,
    group: schedule?.group?.name || MOCK_GROUP.name,
    periodLabel: period
      ? `${formatTime(period.start_time)}–${formatTime(period.end_time)}`
      : "",
  };

  useEffect(() => {
    const token = localStorage.getItem("device_token");
    if (!token) {
      router.replace("/docente/activar");
      return;
    }
    const name = localStorage.getItem("teacher_name") || MOCK_TEACHER.full_name;
    setTeacherName(name);

    const p = getCurrentPeriod();
    const d = getCurrentDayOfWeek();
    setPeriod(p);
    setDayOfWeek(d);

    // Todos los alumnos inician como PRESENTES
    setRecords(
      MOCK_STUDENTS.map((s) => ({
        studentId: s.id,
        status: "present" as AttendanceStatus,
      }))
    );
    setLoading(false);
  }, [router]);

  // Actualizar periodo cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setPeriod(getCurrentPeriod());
      setDayOfWeek(getCurrentDayOfWeek());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = useCallback((studentId: string, status: AttendanceStatus) => {
    if (sessionStatus === "closed") return;
    setRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r))
    );
  }, [sessionStatus]);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Guardar en Supabase
    await new Promise((r) => setTimeout(r, 600));
    setLastSaved(new Date());
    setSaving(false);
  };

  const getStatus = (studentId: string): AttendanceStatus => {
    return records.find((r) => r.studentId === studentId)?.status || "present";
  };

  const counts = {
    present: records.filter((r) => r.status === "present").length,
    absent: records.filter((r) => r.status === "absent").length,
    late: records.filter((r) => r.status === "late").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Sin clase activa
  if (!period || dayOfWeek === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-primary-800 text-white px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-primary-200 text-sm">{teacherName}</p>
            <h1 className="font-bold text-lg">Asistencia Escolar</h1>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕐</span>
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">
              No tienes clase en este momento
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Estás en receso o fuera del horario escolar.
            </p>
            <Link
              href="/"
              className="text-primary-600 text-sm font-medium hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header de la clase */}
      <header className="bg-primary-800 text-white px-4 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-2xl mx-auto">
          <p className="text-primary-200 text-sm">{teacherName}</p>
          <div className="flex items-baseline justify-between mt-1">
            <div>
              <h1 className="font-bold text-xl">{currentClass.subject}</h1>
              <p className="text-primary-100 text-sm">
                {currentClass.group} · {currentClass.periodLabel}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  sessionStatus === "open"
                    ? "bg-success-500 text-white"
                    : sessionStatus === "closed"
                    ? "bg-slate-500 text-white"
                    : "bg-warning-500 text-white"
                }`}
              >
                {sessionStatus === "open"
                  ? "Abierta"
                  : sessionStatus === "closed"
                  ? "Cerrada"
                  : "Pendiente"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Resumen rápido */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-4 text-sm">
          <span className="text-success-700 font-medium">
            ✓ {counts.present} presentes
          </span>
          <span className="text-danger-600 font-medium">
            ✕ {counts.absent} ausentes
          </span>
          <span className="text-warning-600 font-medium">
            ◷ {counts.late} tardanzas
          </span>
        </div>
      </div>

      {/* Lista de alumnos */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {MOCK_STUDENTS.map((student, index) => {
            const status = getStatus(student.id);
            return (
              <div
                key={student.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">
                      {student.full_name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {student.student_code}
                    </p>
                  </div>
                </div>

                {/* Botones de estado */}
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(student.id, "present")}
                    disabled={sessionStatus === "closed"}
                    className={`attendance-btn ${
                      status === "present"
                        ? "attendance-btn-present"
                        : "attendance-btn-inactive"
                    }`}
                  >
                    Presente
                  </button>
                  <button
                    onClick={() => updateStatus(student.id, "absent")}
                    disabled={sessionStatus === "closed"}
                    className={`attendance-btn ${
                      status === "absent"
                        ? "attendance-btn-absent"
                        : "attendance-btn-inactive"
                    }`}
                  >
                    Ausente
                  </button>
                  <button
                    onClick={() => updateStatus(student.id, "late")}
                    disabled={sessionStatus === "closed"}
                    className={`attendance-btn ${
                      status === "late"
                        ? "attendance-btn-late"
                        : "attendance-btn-inactive"
                    }`}
                  >
                    Tardanza
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Barra inferior de guardar */}
      {sessionStatus === "open" && (
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-3 shadow-lg">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-60 transition-colors"
            >
              {saving ? "Guardando..." : "Guardar asistencia"}
            </button>
            {lastSaved && (
              <p className="text-xs text-slate-400 whitespace-nowrap">
                Guardado{" "}
                {lastSaved.toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
