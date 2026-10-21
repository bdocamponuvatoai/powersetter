import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
// Sites supplies generic preview flags. Translate the relevant ones to Next.js.
const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");
const port = portIndex >= 0 ? args[portIndex + 1] : "4173";
const next = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const child = spawn(
  process.execPath,
  [next, "dev", "--webpack", "--hostname", "0.0.0.0", "--port", port],
  {
    stdio: "inherit",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  },
);
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
