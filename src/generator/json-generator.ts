import fs from "node:fs";
import path from "node:path";

export function writeJsonFile(
  directory: string,
  filename: string,
  data: unknown
): void {
  const outputDirectory = path.resolve(
    process.cwd(),
    directory
  );

  fs.mkdirSync(outputDirectory, { recursive: true });

  fs.writeFileSync(
    path.join(outputDirectory, filename),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}