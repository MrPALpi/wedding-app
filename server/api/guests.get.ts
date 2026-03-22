import type { H3Event } from "h3";

import { isAuthenticated } from "../utils/auth";
import { fetchGuestsAggregated } from "../utils/guest-aggregates";

export default defineEventHandler(async (event: H3Event) => {
  const authorized = isAuthenticated(event);

  if (!authorized) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    return await fetchGuestsAggregated();
  } catch (err) {
    console.error("Error fetching guests", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
