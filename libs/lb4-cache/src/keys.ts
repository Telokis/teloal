import { BindingKey, MetadataAccessor } from "@loopback/core";
import { CacheMetadata } from "./types";
import { CachingService } from "./services";

export namespace CacheSecurityBindings {
  export const METADATA = BindingKey.create<CacheMetadata | undefined>(
    "sf.security.cache.operationMetadata",
  );

  export const CACHING_SERVICE = BindingKey.create<CachingService | undefined>(
    "sf.security.cache.service",
  );
}

export const CACHE_METADATA_ACCESSOR = MetadataAccessor.create<CacheMetadata, MethodDecorator>(
  "sf.security.cache.operationMetadata.accessor",
);
