"use client";

import { useState, useRef } from "react";

type ImportType = "alumnos" | "docentes" | "horarios" | null;

type ValidationRow = {
  line: number;
  status: "ok" | "error" | "warning";
  message: string;
};

const TYPE_INFO: Record<
  Exclude<ImportType, null>,
  { title: string; icon: string; columns: string; note: string }
> = {
  alumnos: {
    title: "Alumnos",
    icon: "👨‍🎓",
    columns: "Matrícula, Nombre, Grado, Grupo (solo 1°A–3°B)",
    note: "Los grupos deben ser uno de los 6 oficiales.",
  },
  docentes: {
    title: "Docentes y materias",
    icon: "👨‍🏫",
    columns: "Nombre del docente, Materia(s) que imparte",
    note: "Con esto la plataforma sabe qué docente da cada materia. El grupo se define en el horario.",
  },
  horarios: {
    title: "Horarios (grupos y materias)",
    icon: "🗓️",
    columns: "Día, Periodo, Materia, Grado, Grupo",
    note: "Se cruza con la lista de docentes+materias para asignar automáticamente el docente.",
  },
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
    await new Promise((r) => setTimeout(r, 1000));

    if (importType === "alumnos") {
      setResults([
        { line: 1, status: "ok", message: "Ana García López — 1° A" },
        { line: 2, status: "ok", message: "Carlos Mendoza — 1° A" },
        { line: 3, status: "warning", message: "Matrícula ya existe (se actualizará)" },
        { line: 4, status: "error", message: "Grupo inválido: 4° C (solo se permiten 1°A–3°B)" },
        { line: 5, status: "ok", message: "Fernanda Torres — 2° B" },
      ]);
    } else if (importType === "docentes") {
      setResults([
        { line: 1, status: "ok", message: "Javier Sánchez González → Historia" },
        { line: 2, status: "ok", message: "María López Hernández → Matemáticas" },
        { line: 3, status: "ok", message: "Ana Ruiz Morales → Ciencias, Biología" },
        { line: 4, status: "warning", message: "Materia nueva: se creará 'Geografía'" },
        { line: 5, status: "error", message: "Fila sin nombre de docente" },
      ]);
    } else {
      setResults([
        { line: 1, status: "ok", message: "Lunes P1 · Historia · 2° A → docente: J. Sánchez" },
        { line: 2, status: "ok", message: "Lunes P1 · Matemáticas · 1° B → docente: M. López" },
        { line: 3, status: "error", message: "Materia 'Latín' sin docente asignado en la lista de docentes" },
        { line: 4, status: "error", message: "Grupo inválido: 4° A" },
        { line: 5, status: "warning", message: "Dos docentes dan 'Inglés': se usará el primero; revisa si es correcto" },
        { line: 6, status: "ok", message: "Martes P2 · Ciencias · 3° A → docente: A. Ruiz" },
      ]);
    }
    setValidating(false);
  };

  const confirmImport = () => setConfirmed(true);

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
          Carga alumnos, docentes con sus materias, o horarios. Solo grupos 1°A–3°B.
        </p>
      </div>

      {!importType && (
        <div className="space-y-3">
          {(Object.keys(TYPE_INFO) as Exclude<ImportType, null>[]).map((key) => {
            const info = TYPE_INFO[key];
            return (
              <button
                key={key}
                onClick={() => setImportType(key)}
                className="w-full bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-primary-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-800">{info.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Columnas: {info.columns}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{info.note}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {importType && !results && !confirmed && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <button onClick={reset} className="text-sm text-slate-400 hover:text-slate-600 mb-4">
            ← Cambiar tipo
          </button>
          <h2 className="font-semibold text-slate-800 mb-1">{TYPE_INFO[importType].title}</h2>
          <p className="text-sm text-slate-500 mb-2">
            Columnas: {TYPE_INFO[importType].columns}
          </p>
          <p className="text-xs text-slate-400 mb-6">{TYPE_INFO[importType].note}</p>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary-400 transition-colors"
          >
            <p className="text-slate-500 text-sm">
              {fileName || "Haz clic para seleccionar el archivo Excel (.xlsx)"}
            </p>
            {fileName && <p className="text-primary-600 text-sm font-medium mt-1">{fileName}</p>}
            <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleFile} className="hidden" />
          </div>

          <button
            onClick={analyze}
            disabled={!fileName || validating}
            className="w-full mt-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50"
          >
            {validating ? "Analizando..." : "Analizar archivo"}
          </button>
        </div>
      )}

      {results && !confirmed && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Resultado del análisis</h2>
          <div className="flex gap-4 mb-4 text-sm">
            <span className="text-success-600 font-medium">✓ {okCount} válidas</span>
            <span className="text-warning-600 font-medium">⚠ {warnCount} advertencias</span>
            <span className="text-danger-600 font-medium">✕ {errorCount} errores</span>
          </div>
          <div className="max-h-64 overflow-y-auto border border-slate-100 rounded-lg divide-y mb-6">
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
            <button onClick={reset} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-medium">
              Cancelar
            </button>
            <button
              onClick={confirmImport}
              disabled={okCount + warnCount === 0}
              className="flex-1 py-3 bg-primary-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50"
            >
              Confirmar ({okCount + warnCount} filas)
            </button>
          </div>
        </div>
      )}

      {confirmed && (
        <div className="bg-success-50 border border-success-200 rounded-xl p-8 text-center">
          <div className="text-3xl mb-3">✓</div>
          <h2 className="text-lg font-bold text-success-700 mb-2">Importación simulada</h2>
          <p className="text-sm text-success-600 mb-6">
            En la demo no se guarda en base de datos. Cuando conectemos Supabase, aquí se guardará de verdad.
          </p>
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-success-600 text-white rounded-lg text-sm font-semibold"
          >
            Importar otro archivo
          </button>
        </div>
      )}
    </div>
  );
}
