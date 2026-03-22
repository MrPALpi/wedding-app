import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/schema.ts", // ← путь к твоему(им) файлу(ам) со схемой
  out: "./drizzle", // папка, куда складываются миграции
  dbCredentials: {
    url: process.env.DATABASE_URL, // или напрямую строку, если хочешь
  },
  // опционально, полезно для dev
  verbose: true,
  strict: true,
});
