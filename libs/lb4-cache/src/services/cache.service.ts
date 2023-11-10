import { BindingScope, injectable } from "@loopback/core";
import { CacheEntry } from "../types";

@injectable({ scope: BindingScope.SINGLETON })
export class CachingService {
  private timer: NodeJS.Timer;
  private store: Map<string, CacheEntry> = new Map();

  /**
   * Store an entry in the cache
   * @param key - Key for caching
   * @param data - data to cache
   * @param ttl - time to live in seconds
   */
  async set(key: string, data: unknown, ttl: number) {
    const now = Date.now();

    this.store.set(key, { data, storedAt: now, expiresAt: now + ttl * 1000 });
  }

  /**
   * Load a message from the cache by key
   * @param key - Key for caching
   */
  async get(key: string) {
    const expired = await this.isExpired(key);
    return expired ? undefined : this.store.get(key);
  }

  /**
   * Delete a message from the cache by key
   * @param key - Key for caching
   */
  async delete(key: string) {
    return this.store.delete(key);
  }

  /**
   * Clear the cache
   */
  async clear() {
    this.store.clear();
  }

  /**
   * Check if the cached item is expired by key
   * @param key - Key for caching
   */
  async isExpired(key: string): Promise<boolean> {
    const msg = this.store.get(key);

    if (!msg) {
      return true;
    }

    return msg.expiresAt < Date.now();
  }

  /**
   * Remove expired items from the cache
   */
  async sweep() {
    for (const key of this.store.keys()) {
      if (await this.isExpired(key)) {
        await this.delete(key);
      }
    }
  }

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    await this.clear();

    this.timer = setInterval(() => {
      this.sweep().catch(console.warn);
    }, 1000);
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    if (this.timer) {
      clearInterval(this.timer);
    }

    await this.clear();
  }

  /**
   * This method may be used to restart the service (and may be triggered by a
   * 'refresh' event)
   */
  async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }
}
