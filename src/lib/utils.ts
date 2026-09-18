import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea hora "07:00" a formato legible */
export function formatTime(time: string): string {
  return time.slice(0, 5);
}

/** Día de la semana en español (1=Lunes ... 5=Viernes) */
export function dayName(day: number): string {
  const days = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  return days[day] || "";
}

/** Genera un token aleatorio seguro para dispositivos */
export function generateDeviceToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Genera un código de activación corto (6 caracteres) */
export function generateActivationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
