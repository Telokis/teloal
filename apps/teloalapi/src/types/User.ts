/*
 * Command to generate schema from file:
 * npx ts-json-schema-generator -f ./apps/teloalapi/tsconfig.app.json --path "./apps/teloalapi/src/types/User.ts" --type 'User' --no-type-check --no-top-ref
 */

export enum UserRole {
  user = "user",
  admin = "admin",
}

export type User = {
  username: string;
  email?: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
};
