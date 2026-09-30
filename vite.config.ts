import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  vite: {
    assetsInclude: ["**/*.wasm"],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.message &&
            (warning.message.includes("unwasm") || warning.message.includes("onig.wasm"))
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
