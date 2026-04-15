export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/fonts", "@nuxt/image", "nuxt-svgo", "@nuxt/eslint"],
  routeRules: {
    "/": { prerender: true },
  },
  app: {
    head: {
      title: "САША & ДАНИРА",
      htmlAttrs: {
        lang: "ru",
      },
    },
  },
  svgo: {
    autoImportPath: "./assets/icons/",
  },
  image: {
    inject: true,
    format: ["webp"],
  },
  postcss: {
    plugins: {
      "postcss-sort-media-queries": { sort: "mobile-first" },
      "cssnano":  {
        preset: ["default", { autoprefixer: true, mergeIdents: true, discardUnused: true, reduceIdents: true }],
      },
    },
  },
  css: ["~/assets/styles/index.scss"],
  vite: {
    // Отключить HMR кеширование
    server: {
      hmr: {
        overlay: false,
      },
    },

    // Принудительно перезагружать модули
    optimizeDeps: {
      force: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/mixins" as *;
          `,
        },
      },
    },
  },
});
