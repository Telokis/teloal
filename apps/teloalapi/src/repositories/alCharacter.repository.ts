import { inject } from "@loopback/core";
import {
  Count,
  DefaultCrudRepository,
  Entity,
  Options,
  Where,
  model,
  property,
} from "@loopback/repository";
import { MongoDataSource } from "../datasources/mongo.datasource";
import { AlCharacter } from "@teloal/parse-character";

type Timestamps = {
  createdAt?: Date;
  updatedAt?: Date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GConstructor<T = {}> = new (...args: any[]) => T;

function extendClassWithTimestamps<T extends GConstructor<Entity>>(Base: T) {
  @model({
    name: "AlCharacter",
  })
  class Extended extends Base {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
    }

    @property({
      type: "date",
    })
    createdAt?: Date;

    @property({
      type: "date",
    })
    updatedAt?: Date;
  }

  return Extended;
}

type TimestampedAlCharacter = AlCharacter & Timestamps;

export class AlCharacterRepository extends DefaultCrudRepository<
  TimestampedAlCharacter,
  typeof AlCharacter.prototype.name
> {
  constructor(@inject("datasources.mongo") dataSource: MongoDataSource) {
    super(extendClassWithTimestamps(AlCharacter), dataSource);
  }

  async create(entity: TimestampedAlCharacter, options?: Options): Promise<TimestampedAlCharacter> {
    entity.createdAt = new Date();
    entity.updatedAt = new Date();
    return super.create(entity, options);
  }

  async update(data: TimestampedAlCharacter, options?: Options): Promise<void> {
    data.updatedAt = new Date();
    return super.update(data, options);
  }

  async updateAll(
    data: TimestampedAlCharacter,
    where?: Where<TimestampedAlCharacter>,
    options?: Options,
  ): Promise<Count> {
    data.updatedAt = new Date();
    return super.updateAll(data, where, options);
  }

  async replaceById(id: string, data: TimestampedAlCharacter, options?: Options): Promise<void> {
    data.updatedAt = new Date();
    return super.replaceById(id, data, options);
  }

  async updateById(id: string, data: TimestampedAlCharacter, options?: Options): Promise<void> {
    data.updatedAt = new Date();
    return super.updateById(id, data, options);
  }

  async upsert(char: AlCharacter) {
    if (await this.exists(char.name)) {
      return this.updateById(char.name, char);
    }

    return this.create(char);
  }
}
