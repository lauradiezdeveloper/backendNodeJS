import { fileURLToPath } from "url";
import { dirname } from "path";

const __fileLocalPath = fileURLToPath(import.meta.url);
export const __dirname = dirname(__fileLocalPath);