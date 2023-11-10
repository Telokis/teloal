import * as crypto from "node:crypto";

/**
 * Computes the MD5 hash of the given data string.
 *
 * @param {string} data - The input data to be hashed.
 * @returns {string} The MD5 hash as a hexadecimal string.
 */
export const md5 = (data: string) => crypto.createHash("md5").update(data).digest("hex");

/**
 * Computes the SHA-256 hash of the given data string.
 *
 * @param {string} data - The input data to be hashed.
 * @returns {string} The SHA-256 hash as a hexadecimal string.
 */
export const sha256 = (data: string) => crypto.createHash("sha256").update(data).digest("hex");
