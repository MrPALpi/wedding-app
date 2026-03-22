import ExcelJS from "exceljs";

import type { GuestResponse } from "./guest-aggregates";

import { getAlcoholLabelRu } from "./alcohol-labels";

function formatYesNo(value: boolean): string {
  return value ? "Да" : "Нет";
}

function allergiaCell(value: string | null): string {
  return value?.trim() ?? "";
}

export function exportFileName(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");

  return `Sasha & Danira ${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.xlsx`;
}

function rowsFromGuests(guests: GuestResponse[]): (string | number)[][] {
  const header = [
    "#",
    "ФИО",
    "Телефон",
    "Присутствие",
    "Алкоголь",
    "Ночёвка",
    "Аллергия",
    "Доп. гости",
  ];

  const body = guests.map((g) => [
    g.id,
    g.fullName,
    g.phone,
    formatYesNo(g.presence),
    g.alcohol.map((k) => getAlcoholLabelRu(k)).join(", "),
    formatYesNo(g.night),
    allergiaCell(g.allergia),
    g.additionalGuests.map((a) => a.fullName).join("; "),
  ]);

  return [header, ...body];
}

export async function buildGuestsXlsxBuffer(
  guests: GuestResponse[],
): Promise<Buffer> {
  const rows = rowsFromGuests(guests);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Гости");

  // добавляем строки
  rows.forEach((row) => {
    worksheet.addRow(row);
  });

  // ширина колонок (wch ≈ width)
  worksheet.columns = [
    { width: 6 },
    { width: 28 },
    { width: 14 },
    { width: 12 },
    { width: 40 },
    { width: 10 },
    { width: 24 },
    { width: 36 },
  ];

  // (опционально) стилизуем header
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };

  // генерим buffer
  const buffer = await workbook.xlsx.writeBuffer();

  return Buffer.from(buffer);
}
