import { inject } from "@loopback/core";
import { MongoDataSource } from "../datasources/mongo.datasource";
import { UserModel } from "../models/User.model";
import { makeRepository } from "./AutoDateRepository";

const BaseRepository = makeRepository<UserModel, typeof UserModel.prototype.username>(
  UserModel,
  "User",
  "username",
);

export class UsersRepository extends BaseRepository {
  constructor(@inject("datasources.mongo") dataSource: MongoDataSource) {
    super(dataSource);
  }
}
