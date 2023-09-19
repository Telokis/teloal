import { Stream } from "node:stream";

export const streamToPromise = (stream: Stream) =>
  new Promise((res, rej) => {
    stream.on("end", res);
    stream.on("close", res);
    stream.on("finish", res);
    stream.on("error", rej);
  });
