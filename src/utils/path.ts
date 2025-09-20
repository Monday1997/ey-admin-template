import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "path";

export function getDir(metaUrl: string) {
  return dirname(fileURLToPath(metaUrl));
}
const __dirname = getDir(import.meta.url);
export const vueTmp = path.resolve(__dirname, "../../template");
