import { MethodDecoratorFactory } from "@loopback/core";
import { CacheMetadata, CacheOptions } from "../types";
import { CACHE_METADATA_ACCESSOR } from "../keys";

export function cache(options?: CacheOptions) {
  return MethodDecoratorFactory.createDecorator<CacheMetadata>(CACHE_METADATA_ACCESSOR, {
    enabled: true,
    options,
  });
}
