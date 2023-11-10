import { inject, injectable, Next, Provider } from "@loopback/core";
import { Getter } from "@loopback/repository";
import {
  Request,
  Middleware,
  MiddlewareContext,
  asMiddleware,
  RestMiddlewareGroups,
} from "@loopback/rest";
import { CacheSecurityBindings } from "../keys";
import { CacheMetadata, CacheOptions } from "../types";
import { CacheActionMiddlewareGroup } from "./middleware.enum";
import { CachingService } from "../services";

@injectable(
  asMiddleware({
    group: CacheActionMiddlewareGroup.CACHE,
    upstreamGroups: RestMiddlewareGroups.PARSE_PARAMS,
    downstreamGroups: [RestMiddlewareGroups.INVOKE_METHOD],
  }),
)
export class CacheMiddlewareProvider implements Provider<Middleware> {
  @inject.getter(CacheSecurityBindings.METADATA)
  private readonly getMetadata: Getter<CacheMetadata>;

  @inject(CacheSecurityBindings.CACHING_SERVICE)
  private readonly cachingService: CachingService;

  value() {
    return this.action.bind(this);
  }

  async action(ctx: MiddlewareContext, next: Next) {
    const metadata: CacheMetadata = await this.getMetadata();
    const { request, response } = ctx;

    if (!metadata || !metadata.enabled) {
      response.setHeader("X-Cache-Lookup", "MISS");
      return next();
    }

    response.setHeader("X-Cache-Lookup", "HIT");

    const opts = metadata?.options ?? {};
    const cachingKey = await this.cacheKey(request, opts);
    const cachedResult = await this.cachingService.get(cachingKey);

    const ttl = opts.ttl ?? 10;

    response.setHeader("Cache-Control", `public, max-age=${ttl}`);

    if (cachedResult) {
      const dateHeader = response.getHeader("Date") as string | undefined;
      const date = dateHeader ? new Date(dateHeader) : new Date();

      response.setHeader("Age", Math.floor((date.getTime() - cachedResult.storedAt) / 1000));
      response.setHeader("X-cache", "HIT");

      return cachedResult.data;
    }

    response.setHeader("X-cache", "MISS");
    response.setHeader("Age", 0);

    const result = await next();
    await this.cachingService.set(cachingKey, result, ttl);

    return result;
  }

  async cacheKey(request: Request, opts: CacheOptions = {}): Promise<string> {
    const k = `cache:${request.path}`;

    return opts.caseSensitive ? k : k.toLowerCase();
  }
}
