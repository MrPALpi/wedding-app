import { defineEventHandler } from "h3";
import { isAuthenticated } from "~~/server/utils/auth";

export default defineEventHandler((event) => {
  const authenticated = isAuthenticated(event);

  try {
    return {
      authenticated,
    };
  } catch {
    return {
      authenticated: false,
    };
  }
});
