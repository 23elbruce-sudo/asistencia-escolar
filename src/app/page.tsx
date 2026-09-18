"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Revisar si el dispositivo ya está activado
    const token = localStorage.getItem("device_token");
    setDeviceToken(token);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-800 to-primary-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Logo / Título */}
        <div className="mb-10">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl font-bold text-primary-800">CA</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Asistencia Escolar
          </h1>
          <p className="text-primary-200 text-sm">
            Colegio Cristóbal de las Américas
          </p>
        </div>

        {/* Botones de acceso */}
        <div className="space-y-4">
          {deviceToken ? (
            <Link
              href="/docente"
              className="block w-full py-4 px-6 bg-white text-primary-800 font-semibold rounded-xl shadow-lg hover:bg-primary-50 transition-colors"
            >
              Entrar como Docente
            </Link>
          ) : (
            <Link
              href="/docente/activar"
              className="block w-full py-4 px-6 bg-white text-primary-800 font-semibold rounded-xl shadow-lg hover:bg-primary-50 transition-colors"
            >
              Activar dispositivo de Docente
            </Link>
          )}

          <Link
            href="/admin"
            className="block w-full py-4 px-6 bg-primary-700 text-white font-semibold rounded-xl border-2 border-primary-500 hover:bg-primary-600 transition-colors"
          >
            Acceso Administradores
          </Link>
        </div>

        <p className="mt-10 text-primary-300 text-xs">
          Sistema de asistencia en tiempo real
        </p>
      </div>
    </div>
  );
}
