export const enum Alcohol {
  RedWine = "red_wine",
  WhiteWine = "white_wine",
  Champagne = "champagne",
  Vodka = "vodka",
  Whiskey = "whiskey",
  Cognac = "cognac",
  NonAlcoholic = "non_alcoholic",
}

export const ALCOHOL_LABELS: Record<Alcohol, string> = {
  [Alcohol.RedWine]: "Красное вино",
  [Alcohol.WhiteWine]: "Белое вино",
  [Alcohol.Champagne]: "Шампанское",
  [Alcohol.Vodka]: "Водка",
  [Alcohol.Whiskey]: "Виски",
  [Alcohol.Cognac]: "Коньяк",
  [Alcohol.NonAlcoholic]: "Безалкогольные напитки",
};

export function getAlcoholLabel(value: string): string {
  return ALCOHOL_LABELS[value as Alcohol] ?? value;
}
