import { Entity, model, property } from "@loopback/repository";
import { User, UserRole } from "../types/User";

@model({
  settings: {
    description: "A TeloAL user. Created when registering and used when authenticating.",
  },
})
export class UserModel extends Entity implements User {
  @property({
    id: true,
    jsonSchema: {
      description: "Uniquely identifies a user.",
    },
  })
  username: string;

  @property({
    jsonSchema: {
      description: "Optional email address of the user.",
    },
  })
  email?: string;

  @property({
    jsonSchema: {
      description: "Hashed user password.",
    },
  })
  password: string;

  @property({
    jsonSchema: {
      description: "Hashed user password.",
      enum: ["admin", "user"],
    },
  })
  role: UserRole;
}
