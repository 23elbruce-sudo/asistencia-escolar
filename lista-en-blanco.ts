/** Lista de asistencia en blanco por QUINCENA – solo lunes a viernes */

export type BlankListStudent = {
  full_name: string;
  student_code?: string | null;
};

export type BlankListParams = {
  teacherName: string;
  subject: string;
  group: string;
  periodLabel?: string;
  /** 1 = días 1–15, 2 = días 16–fin de mes */
  quincena: 1 | 2;
  /** Mes 1–12 */
  month: number;
  /** Año */
  year: number;
  ciclo?: string;
  students: BlankListStudent[];
};

const MONTH_NAMES = [
  "",
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const WEEKDAY_SHORT = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

/** Días de la quincena que caen en lunes–viernes */
export function weekdayDaysInQuincena(
  year: number,
  month: number,
  q: 1 | 2
): { day: number; weekday: number; label: string }[] {
  const last = daysInMonth(year, month);
  const start = q === 1 ? 1 : 16;
  const end = q === 1 ? 15 : last;
  const out: { day: number; weekday: number; label: string }[] = [];
  for (let d = start; d <= end; d++) {
    const wd = new Date(year, month - 1, d).getDay(); // 0=dom … 6=sáb
    if (wd >= 1 && wd <= 5) {
      out.push({ day: d, weekday: wd, label: `${WEEKDAY_SHORT[wd]} ${d}` });
    }
  }
  return out;
}

/** Meses del ciclo SEP 2026-2027 (ago 2026 – jul 2027) */
export function cicloSepMonths(): { year: number; month: number; label: string }[] {
  const list: { year: number; month: number; label: string }[] = [];
  // ago 2026 – dic 2026
  for (let m = 8; m <= 12; m++) {
    list.push({ year: 2026, month: m, label: `${MONTH_NAMES[m]} 2026` });
  }
  // ene 2027 – jul 2027
  for (let m = 1; m <= 7; m++) {
    list.push({ year: 2027, month: m, label: `${MONTH_NAMES[m]} 2027` });
  }
  return list;
}

export function printBlankAttendanceList(p: BlankListParams) {
  const ciclo = p.ciclo || "2026-2027";
  const days = weekdayDaysInQuincena(p.year, p.month, p.quincena);
  const monthName = MONTH_NAMES[p.month] || String(p.month);
  const lastDay = daysInMonth(p.year, p.month);
  const quincenaLabel =
    p.quincena === 1
      ? `1ª quincena (1–15 de ${monthName} ${p.year}) · solo lun–vie`
      : `2ª quincena (16–${lastDay} de ${monthName} ${p.year}) · solo lun–vie`;

  if (days.length === 0) {
    alert("No hay días lectivos (lun–vie) en esa quincena.");
    return;
  }

  const dayHeaders = days
    .map((d) => `<th class="day">${d.label}</th>`)
    .join("");

  const rows = p.students
    .map((s, i) => {
      const cells = days.map(() => `<td class="mark"></td>`).join("");
      return `
      <tr>
        <td class="n">${i + 1}</td>
        <td class="name">${escapeHtml(s.full_name)}</td>
        <td class="code">${escapeHtml(s.student_code || "")}</td>
        ${cells}
        <td class="tot"></td>
        <td class="tot"></td>
      </tr>`;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <title>Lista quincenal – ${escapeHtml(p.group)} – ${escapeHtml(p.subject)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 9pt; color: #000; margin: 8mm; }
    h1 { font-size: 13pt; margin: 0 0 2px 0; text-align: center; }
    h2 { font-size: 11pt; margin: 0 0 6px 0; text-align: center; font-weight: normal; }
    .meta { font-size: 9pt; margin-bottom: 8px; line-height: 1.4; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #333; padding: 2px 3px; }
    th { background: #eee; font-size: 7.5pt; }
    th.day { text-align: center; white-space: nowrap; }
    td.n { width: 22px; text-align: center; }
    td.name { text-align: left; font-size: 8.5pt; }
    td.code { width: 58px; font-size: 8pt; }
    td.mark { height: 16px; min-width: 22px; }
    td.tot { width: 28px; }
    .note { font-size: 8pt; margin-top: 8px; }
    .sign { margin-top: 14px; font-size: 9pt; }
    @media print {
      body { margin: 6mm; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <h1>CCA Asistencia Escolar</h1>
  <h2>Lista en blanco · Quincena · Solo lunes a viernes</h2>
  <div class="meta">
    <div><b>Ciclo SEP:</b> ${escapeHtml(ciclo)}</div>
    <div><b>Docente:</b> ${escapeHtml(p.teacherName)}
      &nbsp;&nbsp; <b>Materia:</b> ${escapeHtml(p.subject)}
      &nbsp;&nbsp; <b>Grupo:</b> ${escapeHtml(p.group)}
    </div>
    <div><b>Periodo / hora:</b> ${escapeHtml(p.periodLabel || "_______________")}
      &nbsp;&nbsp; <b>${escapeHtml(quincenaLabel)}</b>
    </div>
    <div style="margin-top:4px"><b>Leyenda:</b> en cada día anote P, A o T. Sin sábados ni domingos.</div>
  </div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Alumno</th>
        <th>Matrícula</th>
        ${dayHeaders}
        <th>Aus.</th>
        <th>Tard.</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <p class="note">
    ${days.length} días lectivos (lun–vie) · Ciclo ${escapeHtml(ciclo)} ·
    P = Presente · A = Ausente · T = Tardanza
  </p>
  <div class="sign">
    Firma del docente: _______________________________ &nbsp;&nbsp; Fecha: _______________
  </div>
  <p class="no-print" style="margin-top:14px;text-align:center">
    <button onclick="window.print()" style="padding:10px 18px;font-size:13px;cursor:pointer">Imprimir / Guardar PDF</button>
  </p>
  <script>setTimeout(function(){ window.print(); }, 350);</script>
</body>
</html>`;

  const w = window.open("", "_blank");
  if (!w) {
    alert("Permite ventanas emergentes para descargar/imprimir la lista.");
    return;
  }
  w.document.write(html);
  w.document.close();
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
