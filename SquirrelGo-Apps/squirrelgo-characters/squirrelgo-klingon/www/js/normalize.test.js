const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const src = fs.readFileSync(__dirname + "/app.js", "utf8");
const match = src.match(/function normalize\(text\) \{[\s\S]*?\n  \}/);
assert.ok(match, "normalize is in app.js");
const context = {};
vm.runInNewContext(match[0] + "\nthis.normalize = normalize;", context);

assert.strictEqual(context.normalize("tlhingan hol"), "tlhIngan Hol");
assert.strictEqual(context.normalize("tlhIngan"), "tlhIngan");
assert.strictEqual(context.normalize("qagh"), "qagh");
assert.strictEqual(context.normalize("chorgh"), "chorgh");
assert.strictEqual(context.normalize("Qapla’"), "Qapla'");
assert.strictEqual(context.normalize("ng"), "ng");
assert.strictEqual(context.normalize("dish"), "DISH");
console.log("normalize keeps tlh, ch and gh together");
