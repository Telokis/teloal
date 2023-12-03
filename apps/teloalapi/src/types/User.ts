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
