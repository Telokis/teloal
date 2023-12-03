import {
  Count,
  DataObject,
  DefaultCrudRepository,
  Entity,
  JugglerDataSource,
  Options,
  Where,
  model,
  property,
} from "@loopback/repository";

type Timestamps = {
  createdAt?: Date;
  updatedAt?: Date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GConstructor<T = {}> = new (...args: any[]) => T;

type TimestampedModel<TModel extends Entity> = TModel & Timestamps;

function extendClassWithTimestamps<T extends GConstructor<Entity>>(Base: T, modelName: string) {
  @model({
    name: modelName,
  })
  class Extended extends Base {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
    }

    @property()
    createdAt?: Date;

    @property()
    updatedAt?: Date;
  }

  return Extended;
}

export function makeRepository<TModel extends Entity, ID>(
  TheModel: GConstructor<TModel>,
  modelName: string,
  idProp: keyof TModel,
) {
  type TimestampedTModel = TimestampedModel<TModel>;

  class AutoDateRepository extends DefaultCrudRepository<TimestampedTModel, ID> {
    constructor(dataSource: JugglerDataSource) {
      // @ts-ignore
      super(extendClassWithTimestamps<GConstructor<TModel>>(TheModel, modelName), dataSource);
    }

    async create(
      data: DataObject<TimestampedTModel>,
      options?: Options,
    ): Promise<TimestampedTModel> {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      return super.create(data, options);
    }

    async update(data: TimestampedTModel, options?: Options): Promise<void> {
      data.updatedAt = new Date();
      return super.update(data, options);
    }

    async updateAll(
      data: DataObject<TimestampedTModel>,
      where?: Where<TimestampedTModel>,
      options?: Options,
    ): Promise<Count> {
      data.updatedAt = new Date();
      return super.updateAll(data, where, options);
    }

    async replaceById(
      id: ID,
      data: DataObject<TimestampedTModel>,
      options?: Options,
    ): Promise<void> {
      data.updatedAt = new Date();
      return super.replaceById(id, data, options);
    }

    async updateById(
      id: ID,
      data: DataObject<TimestampedTModel>,
      options?: Options,
    ): Promise<void> {
      data.updatedAt = new Date();
      return super.updateById(id, data, options);
    }

    async upsert(data: DataObject<TimestampedTModel>) {
      const id = data[idProp] as ID;

      if (await this.exists(id)) {
        return this.updateById(id, data);
      }

      return this.create(data);
    }
  }

  return AutoDateRepository;
}
