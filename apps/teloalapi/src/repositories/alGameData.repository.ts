import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { MongoDataSource } from "../datasources/mongo.datasource";
import { AlGameData } from "../models/alGameData.model";

export class AlGameDataRepository extends DefaultCrudRepository<
  AlGameData,
  typeof AlGameData.prototype.hash
> {
  constructor(@inject("datasources.mongo") dataSource: MongoDataSource) {
    super(AlGameData, dataSource);
  }
}
