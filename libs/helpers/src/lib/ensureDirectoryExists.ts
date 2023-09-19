import * as fs from "node:fs";

const ensureDirectoryExistsSync = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

const ensureDirectoryExists = async (path: string) => {
  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, { recursive: true });
  }
};

export { ensureDirectoryExistsSync, ensureDirectoryExists };
