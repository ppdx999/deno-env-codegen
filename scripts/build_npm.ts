// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "env-files-codegen",
    version: Deno.args[0],
    description: "Genereate ts code from .env files",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/ppdx999/deno-env-codegen.git",
    },
    bugs: {
      url: "https://github.com/ppdx999/deno-env-codegen/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
