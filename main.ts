process.umask(0o022);
import { mkdirSync, writeFileSync } from "node:fs";

// Two-Sentence Horror — make.fun program/v1.
// One fixed line of text, at most 400 characters, written to
// /output/entry.txt with no trailing newline. Deterministic, no
// network, no clock, no randomness.

const LINE =
  "My sleep app recorded a man whispering my name at 3:12 three nights running, so I played it to my brother and he went pale and said that was him, sleep-talking, back when he stayed in June. He moved out in June, and last night's recording has two voices whispering back and forth, and one of them is mine.";

const chars = [...LINE].length;
if (chars < 1 || chars > 400 || LINE.includes("\n") || !/\S/.test(LINE)) {
  throw new Error(`entry fails the gate: ${chars} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${chars} characters to /output/entry.txt`);
