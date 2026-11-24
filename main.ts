process.umask(0o022);
import { mkdirSync, writeFileSync } from "node:fs";

// Two-Sentence Horror — a make.fun program/v1 entry.
// The whole entry is one fixed line of at most 400 characters.
// It lands in /output/entry.txt with no trailing newline, and the
// program is fully deterministic: no network, no clock, no dice.

// The entry is stored as its two sentences and joined with a single
// space, which reproduces the original one-line text exactly.
const FIRST_SENTENCE =
  "My sleep app recorded a man whispering my name at 3:12 three nights running, so I played it to my brother and he went pale and said that was him, sleep-talking, back when he stayed in June.";
const SECOND_SENTENCE =
  "He moved out in June, and last night's recording has two voices whispering back and forth, and one of them is mine.";
const ENTRY_TEXT = [FIRST_SENTENCE, SECOND_SENTENCE].join(" ");

// Gate check: the joined text must be 1–400 characters long, must
// stay on a single line, and must contain a non-space character.
const charCount = [...ENTRY_TEXT].length;
const tooShort = charCount < 1;
const tooLong = charCount > 400;
const spansLines = ENTRY_TEXT.includes("\n");
const allBlank = !/\S/.test(ENTRY_TEXT);
if (tooShort || tooLong || spansLines || allBlank) {
  throw new Error(`entry fails the gate: ${charCount} chars`);
}

// Write the entry out, creating /output first if it is missing.
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = "/output/entry.txt";
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
console.log(`wrote ${charCount} characters to /output/entry.txt`);
