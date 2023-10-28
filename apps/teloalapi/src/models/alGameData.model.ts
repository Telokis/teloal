import { Entity, model, property } from "@loopback/repository";

@model({
  settings: {
    description: "This model represents an instance of game data (G property) as well as metadata.",
  },
  jsonSchema: {
    required: ["name", "price", "rid"],
  },
})
export class AlGameData extends Entity {
  @property({
    id: true,
    jsonSchema: {
      description: "Uniquely identifies game data.",
    },
  })
  hash: string;

  @property({
    jsonSchema: {
      description: "The game version associated to this game data.",
    },
  })
  version: number;

  @property({
    jsonSchema: {
      description: "Date this game data was retrieved at",
    },
  })
  createdAt: Date;

  @property({
    jsonSchema: {
      description: "Game data raw object. Equivalent to G in game. Stringified.",
    },
  })
  json: string;
}
