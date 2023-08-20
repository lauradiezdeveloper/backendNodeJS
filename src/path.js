import { fileURLtoPath } from "url";
import { dirname } from "path";

const __fileLocalPath = fileURLtoPath(import.meta.url);
export const __dirname = dirname(__fileLocalPath);