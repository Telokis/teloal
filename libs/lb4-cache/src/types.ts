export interface CacheOptions {
  /** How long the result for this request will be cached. In seconds */
  ttl?: number;

  /** Whether the URL should be considered case-sensitive or not. Defaults to false. */
  caseSensitive?: boolean;
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
  data: unknown;
}
