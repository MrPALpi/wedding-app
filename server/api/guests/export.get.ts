import type { H3Event } from "h3";

import { isAuthenticated } from "../../utils/auth";
import { fetchGuestsAggregated } from "../../utils/guest-aggregates";
import { buildGuestsXlsxBuffer, exportFileName } from "../../utils/guests-xlsx";

export default defineEventHandler(async (event: H3Event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const list = await fetchGuestsAggregated();
    const buffer = buildGuestsXlsxBuffer(list);
    const filename = exportFileName();

    setResponseHeaders(event, {
      "content-type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": `attachment; filename="${filename}"`,
    });

    return buffer;
  } catch (err) {
    console.error("Error exporting guests xlsx", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
