"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ActivarDispositivoPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleActivate = async () => {
    if (code.trim().length < 6) {
      setError("Ingresa el código de 6 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // TODO: Llamar a la API real cuando esté conectada a Supabase
      // Por ahora simulamos la activación para desarrollo
      await new Promise((r) => setTimeout(r, 800));

      // Generar token de dispositivo y guardarlo
      const token =
        "dev_" +
        Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      localStorage.setItem("device_token", token);
      localStorage.setItem("teacher_name", "Javier Sánchez González");

      setSuccess(true);
      setTimeout(() => {
        router.push("/docente");
      }, 1500);
    } catch {
      setError("Código inválido o expirado. Solicita uno nuevo al administrador.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-success-50 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-success-700 mb-2">
            ¡Dispositivo activado!
          </h2>
          <p className="text-success-600">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary-800 text-white px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/" className="text-primary-200 hover:text-white">
            ← Volver
          </Link>
          <h1 className="font-semibold text-lg">Activar dispositivo</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-2 text-center">
              Código de activación
            </h2>
            <p className="text-sm text-slate-500 mb-6 text-center">
              Pide al administrador el código QR o el código de 6 caracteres
              para vincular este dispositivo.
            </p>

            <input
              type="text"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
              }
              maxLength={6}
              placeholder="ABC123"
              className="w-full text-center text-2xl font-mono tracking-widest py-4 px-4 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:outline-none mb-4"
              autoFocus
            />

            {error && (
              <p className="text-danger-600 text-sm text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleActivate}
              disabled={loading || code.length < 6}
              className="w-full py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Activando..." : "Activar dispositivo"}
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Una vez activado, este dispositivo quedará asociado permanentemente
            al docente hasta que el administrador lo desvincule.
          </p>
        </div>
      </main>
    </div>
  );
}
