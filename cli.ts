import { parse } from "https://deno.land/std@0.100.0/flags/mod.ts";
import { genCode, Options } from "./codegen.ts";

const args = parse(Deno.args);

const inPath: string = args.i || "./.env";
const outPath: string = args.o || "out.ts";
const type: "deno" | "node" = args.t || "deno";
if (type !== "deno" && type !== "node") {
  throw new Error("Invalid type");
}

const options: Options = { type };

const text = await Deno.readTextFile(inPath);

const output = genCode(options)(text);

await Deno.writeTextFile(outPath, output);
