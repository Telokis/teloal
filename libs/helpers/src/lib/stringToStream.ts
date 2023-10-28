import { Readable } from "node:stream";

export function stringToStream(str: string) {
  const stream = new Readable();

  stream.push(str);
  stream.push(null);

  return stream;
}
