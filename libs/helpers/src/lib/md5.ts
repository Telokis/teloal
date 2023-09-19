import * as crypto from "node:crypto";

export const md5 = (data: string) => crypto.createHash("md5").update(data).digest("hex");
