import { Constructor, inject, MetadataInspector, Provider } from "@loopback/context";
import { CoreBindings } from "@loopback/core";
import { CacheMetadata } from "../types";
import { CACHE_METADATA_ACCESSOR } from "../keys";

export class CacheMetadataProvider implements Provider<CacheMetadata | undefined> {
  @inject(CoreBindings.CONTROLLER_CLASS, { optional: true })
  private readonly controllerClass: Constructor<{}>;

  @inject(CoreBindings.CONTROLLER_METHOD_NAME, { optional: true })
  private readonly methodName: string;

  value(): CacheMetadata | undefined {
    if (!this.controllerClass || !this.methodName) {
      return;
    }

    return getCacheMetadata(this.controllerClass, this.methodName);
  }
}

export function getCacheMetadata(
  controllerClass: Constructor<{}>,
  methodName: string,
): CacheMetadata | undefined {
  return MetadataInspector.getMethodMetadata<CacheMetadata>(
    CACHE_METADATA_ACCESSOR,
    controllerClass.prototype,
    methodName,
  );
}
