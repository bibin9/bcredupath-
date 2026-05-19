import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

let client: Anthropic | null = null;
let cachedKey: string | null = null;

/**
 * Resolve the Anthropic API key with a fallback path.
 *
 * Next.js's automatic .env.local loading does NOT override existing process
 * env vars. If the user's shell has `ANTHROPIC_API_KEY=` (empty) set as a
 * system env var, the value from .env.local is ignored. To work around that,
 * we fall back to reading .env.local directly when process.env is empty.
 */
function resolveApiKey(): string | null {
  if (cachedKey) return cachedKey;

  const fromEnv = process.env.ANTHROPIC_API_KEY?.trim();
  if (fromEnv) {
    cachedKey = fromEnv;
    return cachedKey;
  }

  // Fallback: read .env.local directly
  try {
    const path = join(process.cwd(), ".env.local");
    if (existsSync(path)) {
      const content = readFileSync(path, "utf8");
      const match = content.match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.+?)\s*$/m);
      if (match && match[1]) {
        const raw = match[1].replace(/^['"]|['"]$/g, "").trim();
        if (raw) {
          cachedKey = raw;
          // Side-effect: write it back to process.env so the SDK and other
          // code paths see it too.
          process.env.ANTHROPIC_API_KEY = raw;
          return cachedKey;
        }
      }
    }
  } catch {
    // ignore, will throw below
  }

  return null;
}

export function claude(): Anthropic {
  if (client) return client;
  const apiKey = resolveApiKey();
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is missing. Either:\n" +
        " 1. Add it to .env.local then restart `npm run dev`, OR\n" +
        " 2. If you have `ANTHROPIC_API_KEY=` set as a system env var (Windows: System Properties → Environment Variables), unset/remove it — it's overriding .env.local."
    );
  }
  client = new Anthropic({ apiKey });
  return client;
}

export const CLAUDE_MODEL = "claude-sonnet-4-6" as const;
