import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import { terser } from "rollup-plugin-terser";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const reactUrl = "https://www.nav.no/tms-min-side-assets/react/18/esm/index.js";
const reactDomUrl = "https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js";

const imports = {
  react: reactUrl,
  "react-dom": reactDomUrl,
};

export default () => ({
  plugins: [
    react(),
    terser(),
    cssInjectedByJsPlugin(),
    {
      ...rollupImportMapPlugin([{ imports }]),
      enforce: "pre",
      apply: "build",
    },
  ],
  build: {
    manifest: true,
    copyPublicDir: false,
    rollupOptions: {
      input: {
        "tms-varsler-mikrofrontend": resolve(__dirname, "src/Mikrofrontend.tsx"),
      },
      preserveEntrySignatures: "exports-only",
      output: {
        entryFileNames: "[name].[hash].js",
        format: "esm",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["@testing-library/user-event"],
    },
    setupFiles: ["vitest-setup.ts"],
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
