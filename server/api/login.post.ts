import type { H3Event } from "h3";

import { setAdminAuthCookie } from "../utils/auth";

interface LoginBody {
  login: string;
  password: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<LoginBody>(event);

  if (
    !body ||
		typeof body.login !== "string" ||
		typeof body.password !== "string"
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const { login, password } = body;

  const adminLogin = process.env.ADMIN_LOGIN;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminLogin || !adminPassword) {
    console.error("ADMIN_LOGIN or ADMIN_PASSWORD is not set");
    throw createError({
      statusCode: 500,
      statusMessage: "Auth is not configured",
    });
  }

  const isValid = login === adminLogin && password === adminPassword;

  if (!isValid) {
    // по требованиям можно просто вернуть success: false
    return { success: false };
  }

  // создаём JWT и кладём в httpOnly cookie
  setAdminAuthCookie(event);

  return { success: true };
});
