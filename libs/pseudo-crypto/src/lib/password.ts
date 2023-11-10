import { hash, compare } from "bcrypt";
import { sha256 } from "./hashes";

/**
 * Combines a password and a pepper to generate a new string.
 *
 * @param {string} password - The user's password.
 * @param {string} pepper - A secret value to add additional security.
 * @returns {string} New string based on both parameters.
 */
export function sprinklePassword(password: string, pepper: string): string {
  return sha256(`${pepper}|${password}`);
}

/**
 * Hashes a password using bcrypt with a specified number of rounds and a pepper.
 *
 * @param {string} password - The user's password.
 * @param {number} rounds - The number of bcrypt hashing rounds.
 * @param {string} pepper - A secret value to add additional security.
 * @returns {Promise<string>} A promise resolving to the hashed password.
 */
export async function hashPassword(
  password: string,
  rounds: number,
  pepper: string,
): Promise<string> {
  return hash(sprinklePassword(password, pepper), rounds);
}

/**
 * Compares a password with its hashed counterpart using bcrypt and a pepper.
 *
 * @param {string} password - The user's password.
 * @param {string} hashed - The hashed password to compare against.
 * @param {string} pepper - A secret value used during hashing for additional security.
 * @returns {Promise<boolean>} A promise resolving to true if the password matches the hashed value, otherwise false.
 */
export async function comparePassword(
  password: string,
  hashed: string,
  pepper: string,
): Promise<boolean> {
  return compare(sprinklePassword(password, pepper), hashed);
}
