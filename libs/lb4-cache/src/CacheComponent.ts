import { Binding, Component, ProviderMap, createBindingFromClass } from "@loopback/core";
import { createMiddlewareBinding } from "@loopback/rest";
import { CacheSecurityBindings } from "./keys";
import { CacheMiddlewareProvider } from "./middleware";
import { CacheMetadataProvider } from "./providers";
import { CachingService } from "./services";

export class CacheComponent implements Component {
  constructor() {
    this.providers = {
      [CacheSecurityBindings.METADATA.key]: CacheMetadataProvider,
    };

    this.bindings.push(createMiddlewareBinding(CacheMiddlewareProvider));
    this.bindings.push(
      createBindingFromClass(CachingService, { key: CacheSecurityBindings.CACHING_SERVICE.key }),
    );
  }

  providers?: ProviderMap;
  bindings: Binding[] = [];
}
