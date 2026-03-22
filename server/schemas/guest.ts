import { z } from "zod";

/** Совпадает с enum Alcohol в app/types (значения в БД/API). */
export const alcoholOptionValues = [
  "red_wine",
  "white_wine",
  "champagne",
  "vodka",
  "whiskey",
  "cognac",
  "non_alcoholic",
] as const;

export const AdditionalGuestSchema = z.object({
  fullName: z.string().trim().min(1, "Имя дополнительного гостя обязательно"),
});

// ─── Основная схема запроса ───
export const CreateGuestSchema = z.object({
  fullName: z.string().trim().min(2, "Имя должно быть не короче 2 символов"),
  phone: z
    .string()
    .trim()
    .min(11, "Номер телефона слишком короткий")
    .max(11, "Номер телефона слишком длинный")
    .regex(/^[+\d\s()-]{11}$/, "Неверный формат номера телефона"),
  presence: z.boolean({ error: "Укажите, будете ли вы присутствовать" }),
  alcohol: z
    .array(z.enum(alcoholOptionValues))
    .default([]),
  night: z.boolean({ error: "Укажите, останетесь ли на ночь" }),
  allergia: z.string().trim().max(200).nullable().optional().default(null),
  additionalGuests: z
    .array(AdditionalGuestSchema)
    .max(10, "Максимум 10 дополнительных гостей")
    .optional()
    .default([]),
});

// ─── Тип, выведенный из схемы (для TypeScript) ───
export type CreateGuestBody = z.infer<typeof CreateGuestSchema>;
