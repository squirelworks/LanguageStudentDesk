// Replay SquirrelGo-Apps/shared/strokes.js and write the vectors the Kotlin
// tests assert against. Run from the repo root:
//   node native/core/tools/gen_stroke_vectors.mjs
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");
const sandbox = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "SquirrelGo-Apps/shared/strokes.js"), "utf8"),
  sandbox,
  { filename: "strokes.js" },
);
const S = sandbox.window.Strokes;

const paths = [
  "M0,0 L10,0 L10,10",
  "M28.4,30.3 L31.4,31.7 L35.7,31.8 L46.5,30.6",
  "M10,10 Q50,0 90,10 Q50,40 10,10",
  "M0,0 L0,0",
  "M5.5,6 L100,0.25 L0,100",
];

const drawnOf = (d) => S.resample(S.points(d), 8);
const shift = (pts) => pts.map(([x, y]) => [x + 40, y - 30]);

const vectors = {
  points: paths.map((d) => ({ in: d, out: S.points(d) })),
  resample: paths.map((d) => ({ in: d, n: 24, out: S.resample(S.points(d), 24) })),
  judge: paths.flatMap((d) => {
    const drawn = drawnOf(d);
    return [
      { d, drawn, out: S.judge(drawn, d) },
      { d, drawn: drawn.slice().reverse(), out: S.judge(drawn.slice().reverse(), d) },
      { d, drawn: shift(drawn), out: S.judge(shift(drawn), d) },
    ];
  }),
};

const out = path.join(here, "../src/jvmTest/resources/stroke-vectors.json");
fs.writeFileSync(out, JSON.stringify(vectors));
console.log(out);
