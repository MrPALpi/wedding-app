/** Подписи для значений алкоголя (как в app/types, enum Alcohol). */
const ALCOHOL_LABELS: Record<string, string> = {
  red_wine: "Красное вино",
  white_wine: "Белое вино",
  champagne: "Шампанское",
  vodka: "Водка",
  whiskey: "Виски",
  cognac: "Коньяк",
  non_alcoholic: "Безалкогольные напитки",
};

export function getAlcoholLabelRu(value: string): string {
  return ALCOHOL_LABELS[value] ?? value;
}
