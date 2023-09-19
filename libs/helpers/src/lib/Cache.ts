import { readFile, unlink, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import * as path from "node:path";

export class Cache<T> {
  filepath: string;

  data: T | null = null;

  isJSON: boolean;

  noCache: boolean;

  constructor(filepath: string, isJSON = true, noCache = false) {
    this.filepath = path.resolve(process.cwd(), filepath);
    this.isJSON = isJSON;
    this.noCache = noCache;
  }

  loadSync() {
    if (this.noCache) {
      return null;
    }

    try {
      const content = readFileSync(this.filepath, "utf-8");

      this.data = this.isJSON ? JSON.parse(content) : content;
    } catch (err) {
      const e = err as Error;

      if (!e.message.includes("ENOENT: no such file or directory")) {
        console.warn(`Unable to readSync cache file "${this.filepath}":`, e.message);
      }
    }

    return this.data;
  }

  async load() {
    if (this.noCache) {
      return null;
    }

    try {
      const content = await readFile(this.filepath, "utf-8");

      this.data = this.isJSON ? JSON.parse(content) : content;
    } catch (err) {
      const e = err as Error;

      if (!e.message.includes("ENOENT: no such file or directory")) {
        console.warn(`Unable to read cache file "${this.filepath}":`, e.message);
      }
    }

    return this.data;
  }

  async write(data: T) {
    if (this.noCache) {
      return;
    }

    this.data = data;

    try {
      await writeFile(
        this.filepath,
        // @ts-ignore
        this.isJSON ? JSON.stringify(this.data) : this.data,
        "utf-8",
      );
    } catch (err) {
      console.warn(`Unable to write cache file "${this.filepath}":`, (err as Error).message);
    }
  }

  async remove() {
    if (this.noCache) {
      return;
    }

    try {
      await unlink(this.filepath);

      this.data = null;
    } catch (err) {
      console.warn(`Unable to remove cache file "${this.filepath}":`, (err as Error).message);
    }
  }
}
