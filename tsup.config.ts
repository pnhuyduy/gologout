import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  noExternal: ["nanoid"],
  dts: {
    resolve: true,
    entry: "src/index.ts",
  },
})
