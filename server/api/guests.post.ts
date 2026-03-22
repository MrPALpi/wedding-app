import { z } from "zod";

import { db, guests } from "../db";
import { CreateGuestSchema } from "../schemas/guest";

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, (rawBody) =>
      CreateGuestSchema.parse(rawBody),
    );

    const {
      fullName,
      phone,
      presence,
      alcohol,
      night,
      allergia = null,
      additionalGuests = [],
    } = body;

    const [mainGuest] = await db
      .insert(guests)
      .values({
        parentId: null,
        fullName,
        phone,
        presence,
        alcohol,
        night,
        allergia,
      })
      .returning({ id: guests.id });

    if (!mainGuest?.id) {
      throw createError({
        statusCode: 500,
        statusMessage: "Не удалось создать основного гостя",
      });
    }

    if (additionalGuests.length > 0) {
      const values = additionalGuests
        .filter((g) => g.fullName.trim().length > 0) // дополнительная защита
        .map((g) => ({
          parentId: mainGuest.id,
          fullName: g.fullName.trim(),
          phone,
          presence,
          alcohol,
          night,
          allergia,
        }));

      if (values.length > 0) {
        await db.insert(guests).values(values);
      }
    }

    return { success: true };
  } catch (err) {
  // Обработка ошибок Zod
    if (err instanceof z.ZodError) {
      // Можно вернуть красивые ошибки для фронта
      const formattedErrors = err.flatten().fieldErrors;

      throw createError({
        statusCode: 400,
        statusMessage: "Ошибка валидации",
        data: formattedErrors,
      });
    }

    // Другие ошибки (БД и т.д.)
    console.error("Ошибка при создании гостей:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Внутренняя ошибка сервера",
    });
  }
});
