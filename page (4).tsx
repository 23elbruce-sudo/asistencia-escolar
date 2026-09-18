"use client";

const DEMO_TEACHERS = [
  { id: "1", code: "DOC001", name: "Javier Sánchez González", devices: 1, active: true },
  { id: "2", code: "DOC002", name: "María López Hernández", devices: 1, active: true },
  { id: "3", code: "DOC003", name: "Roberto Hernández Díaz", devices: 0, active: true },
  { id: "4", code: "DOC004", name: "Ana Ruiz Morales", devices: 1, active: true },
  { id: "5", code: "DOC005", name: "Carlos Méndez Soto", devices: 1, active: true },
  { id: "6", code: "DOC006", name: "Patricia Gómez Vargas", devices: 0, active: true },
  { id: "7", code: "DOC007", name: "Luis Fernando Torres", devices: 1, active: true },
  { id: "8", code: "DOC008", name: "Elena Ramírez Cruz", devices: 0, active: false },
  { id: "9", code: "DOC009", name: "Miguel Ángel Castillo", devices: 1, active: true },
  { id: "10", code: "DOC010", name: "Sofía Herrera Luna", devices: 1, active: true },
  { id: "11", code: "DOC011", name: "Diego Morales Peña", devices: 0, active: true },
  { id: "12", code: "DOC012", name: "Carmen Núñez Ortiz", devices: 1, active: true },
  { id: "13", code: "DOC013", name: "Andrés Vargas Ríos", devices: 1, active: true },
];

export default function DocentesPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Docentes</h1>
          <p className="text-slate-500 text-sm mt-1">
            {DEMO_TEACHERS.length} docentes ·{" "}
            {DEMO_TEACHERS.filter((t) => t.devices > 0).length} con dispositivo vinculado
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            Generar código QR
          </button>
          <button className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors">
            + Agregar docente
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Código</th>
                <th className="text-left px-4 py-3 font-medium">Nombre</th>
                <th className="text-center px-4 py-3 font-medium">Dispositivos</th>
                <th className="text-center px-4 py-3 font-medium">Estado</th>
                <th className="text-right px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_TEACHERS.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-slate-500">{t.code}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{t.name}</td>
                  <td className="px-4 py-3 text-center">
                    {t.devices > 0 ? (
                      <span className="inline-flex items-center gap-1 text-success-600 font-medium">
                        <span className="w-2 h-2 bg-success-500 rounded-full" />
                        {t.devices}
                      </span>
                    ) : (
                      <span className="text-slate-400">Sin vincular</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        t.active
                          ? "bg-success-100 text-success-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {t.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="text-primary-600 text-xs font-medium hover:underline">
                      Editar
                    </button>
                    {t.devices > 0 ? (
                      <button className="text-warning-600 text-xs font-medium hover:underline">
                        Desvincular
                      </button>
                    ) : (
                      <button className="text-success-600 text-xs font-medium hover:underline">
                        Vincular
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
