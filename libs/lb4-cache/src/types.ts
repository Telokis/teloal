export interface CacheOptions {
  /** How long the result for this request will be cached. In seconds */
  ttl?: number;
}

/**
 * Cache metadata interface for the method decorator
 */
export interface CacheMetadata {
  enabled: boolean;
  options?: CacheOptions;
}

export interface CacheEntry {
  storedAt: number;
  expiresAt: number;
  data: any;
}
