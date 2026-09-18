"use client";

import { useState, useRef } from "react";

type ImportType = "alumnos" | "horarios" | null;
type ValidationRow = {
  line: number;
  status: "ok" | "error" | "warning";
  message: string;
};

export default function ImportarPage() {
  const [importType, setImportType] = useState<ImportType>(null);
  const [fileName, setFileName] = useState("");
  const [validating, setValidating] = useState(false);
  const [results, setResults] = useState<ValidationRow[] | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResults(null);
    setConfirmed(false);
  };

  const analyze = async () => {
    if (!fileName || !importType) return;
    setValidating(true);
    // Simulación de validación
    await new Promise((r) => setTimeout(r, 1200));

    if (importType === "alumnos") {
      setResults([
        { line: 1, status: "ok", message: "Ana García López — 1° A" },
        { line: 2, status: "ok", message: "Carlos Mendoza Ruiz — 1° A" },
        { line: 3, status: "warning", message: "Diana Fernández — matrícula ya existe (se actualizará)" },
        { line: 4, status: "error", message: "Fila sin nombre completo" },
        { line: 5, status: "ok", message: "Eduardo Ramírez Cruz — 2° B" },
        { line: 6, status: "error", message: "Grupo inválido: 4° C" },
        { line: 7, status: "ok", message: "Fernanda Torres Vargas — 3° A" },
      ]);
    } else {
      setResults([
        { line: 1, status: "ok", message: "Lunes · Periodo 1 · J. Sánchez · Historia · 2° A" },
        { line: 2, status: "ok", message: "Lunes · Periodo 2 · M. López · Matemáticas · 1° B" },
        { line: 3, status: "error", message: "Docente no existe: Pedro Pérez" },
        { line: 4, status: "error", message: "Conflicto: mismo docente en dos grupos a la misma hora" },
        { line: 5, status: "warning", message: "Materia nueva: se creará 'Geografía'" },
        { line: 6, status: "ok", message: "Martes · Periodo 1 · A. Ruiz · Ciencias · 2° B" },
      ]);
    }
    setValidating(false);
  };

  const confirmImport = async () => {
    setConfirmed(true);
    // Aquí se enviaría a la API real
  };

  const reset = () => {
    setImportType(null);
    setFileName("");
    setResults(null);
    setConfirmed(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const okCount = results?.filter((r) => r.status === "ok").length ?? 0;
  const errorCount = results?.filter((r) => r.status === "error").length ?? 0;
  const warnCount = results?.filter((r) => r.status === "warning").length ?? 0;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Importar Excel</h1>
        <p className="text-slate-500 text-sm mt-1">
          Solo el administrador principal puede importar. Se valida antes de guardar.
        </p>
      </div>

      {/* Paso 1: elegir tipo */}
      {!importType && (
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => setImportType("alumnos")}
            className="bg-white border border-slate-200 rounded-xl p-6 text-left hover:border-primary-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">👨‍🎓</div>
            <h3 className="font-semibold text-slate-800">Importar alumnos</h3>
            <p className="text-sm text-slate-500 mt-1">
              Columnas: Matrícula, Nombre, Grado, Grupo
            </p>
          </button>
          <button
            onClick={() => setImportType("horarios")}
            className="bg-white border border-slate-200 rounded-xl p-6 text-left hover:border-primary-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">🗓️</div>
            <h3 className="font-semibold text-slate-800">Importar horarios</h3>
            <p className="text-sm text-slate-500 mt-1">
              Columnas: Día, Inicio, Fin, Docente, Materia, Grado, Grupo
            </p>
          </button>
        </div>
      )}

      {/* Paso 2: subir archivo */}
      {importType && !results && !confirmed && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <button
            onClick={reset}
            className="text-sm text-slate-400 hover:text-slate-600 mb-4"
          >
            ← Cambiar tipo
          </button>
          <h2 className="font-semibold text-slate-800 mb-1">
            {importType === "alumnos" ? "Importar alumnos" : "Importar horarios"}
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Sube un archivo .xlsx o .xls. El sistema analizará los datos antes de guardar.
          </p>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors"
          >
            <p className="text-slate-500 text-sm mb-1">
              {fileName || "Haz clic para seleccionar el archivo Excel"}
            </p>
            {fileName && (
              <p className="text-primary-600 text-sm font-medium">{fileName}</p>
            )}
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          <button
            onClick={analyze}
            disabled={!fileName || validating}
            className="w-full mt-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {validating ? "Analizando..." : "Analizar archivo"}
          </button>
        </div>
      )}

      {/* Paso 3: resultados de validación */}
      {results && !confirmed && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Resultado del análisis</h2>

          <div className="flex gap-4 mb-4 text-sm">
            <span className="text-success-600 font-medium">✓ {okCount} válidas</span>
            <span className="text-warning-600 font-medium">⚠ {warnCount} advertencias</span>
            <span className="text-danger-600 font-medium">✕ {errorCount} errores</span>
          </div>

          <div className="max-h-64 overflow-y-auto border border-slate-100 rounded-lg divide-y divide-slate-50 mb-6">
            {results.map((r) => (
              <div key={r.line} className="flex items-start gap-3 px-3 py-2 text-sm">
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                    r.status === "ok"
                      ? "bg-success-500"
                      : r.status === "warning"
                      ? "bg-warning-500"
                      : "bg-danger-500"
                  }`}
                >
                  {r.status === "ok" ? "✓" : r.status === "warning" ? "!" : "✕"}
                </span>
                <div>
                  <span className="text-slate-400 text-xs">Fila {r.line}: </span>
                  <span className="text-slate-700">{r.message}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              onClick={confirmImport}
              disabled={errorCount > 0 && okCount === 0}
              className="flex-1 py-3 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50"
            >
              Confirmar e importar ({okCount + warnCount} filas)
            </button>
          </div>
          {errorCount > 0 && (
            <p className="text-xs text-slate-400 mt-3 text-center">
              Las filas con error se omitirán. Solo se importarán las válidas y las advertencias.
            </p>
          )}
        </div>
      )}

      {/* Paso 4: éxito */}
      {confirmed && (
        <div className="bg-success-50 border border-success-200 rounded-xl p-8 text-center">
          <div className="w-14 h-14 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
            ✓
          </div>
          <h2 className="text-lg font-bold text-success-700 mb-2">
            Importación completada
          </h2>
          <p className="text-sm text-success-600 mb-6">
            Se importaron {okCount + warnCount} registros correctamente.
          </p>
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-success-600 text-white rounded-lg text-sm font-semibold hover:bg-success-700"
          >
            Importar otro archivo
          </button>
        </div>
      )}
    </div>
  );
}
