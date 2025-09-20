import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/gen-vue-tmp"],
  outDir: "dist",
  declaration: false,
  clean: true,
  rollup: {
    esbuild: {
      minify: true,
    },
  },
});
