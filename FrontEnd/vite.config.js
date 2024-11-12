import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [wasm(), topLevelAwait(), react()],
  resolve: {
    alias: {
      "opencascade.js": "opencascade.js/dist/opencascade.wasm.js",
    },
  },
  build: {
    target: "esnext",
    modulePreload: {
      polyfill: false,
    },
  },
});
