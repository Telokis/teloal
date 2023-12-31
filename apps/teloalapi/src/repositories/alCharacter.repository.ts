import { AlCharacter } from "@teloal/parse-character";
import { inject } from "@loopback/core";
import { MongoDataSource } from "../datasources/mongo.datasource";
import { makeRepository } from "./AutoDateRepository";

const BaseRepository = makeRepository<AlCharacter, typeof AlCharacter.prototype.name>(
  AlCharacter,
  "AlCharacter",
  "name",
);

export class AlCharacterRepository extends BaseRepository {
  constructor(@inject("datasources.mongo") dataSource: MongoDataSource) {
    super(dataSource);
  }
}
