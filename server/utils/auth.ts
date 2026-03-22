import type { H3Event } from "h3";

import jwt from "jsonwebtoken";

const COOKIE_NAME = "auth_token";

interface JwtPayload {
  role: "admin";
  iat: number;
  exp: number;
}

/**
 * Проверка авторизации администратора.
 * Возвращает true, если JWT из cookie валиден.
 */
export function isAuthenticated(event: H3Event): boolean {
  const token = getCookie(event, COOKIE_NAME);

  if (!token) {
    return false;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    // В dev-окружении лучше фейлить явно
    console.error("JWT_SECRET is not set");

    return false;
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    return decoded.role === "admin";
  } catch (err) {
    console.error("JWT verification failed", err);

    return false;
  }
}

/**
 * Устанавливает JWT cookie с ролью администратора.
 */
export function setAdminAuthCookie(event: H3Event) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  const token = jwt.sign({ role: "admin" }, secret, {
    expiresIn: "7d",
  });

  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  });
}
