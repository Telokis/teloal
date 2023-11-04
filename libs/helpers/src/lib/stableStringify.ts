export function stableStringify<T>(data: T): string {
  const seen: Array<T> = [];

  return (
    (function stringify(node) {
      //@ts-ignore
      if (node && node.toJSON && typeof node.toJSON === "function") {
        //@ts-ignore
        node = node.toJSON();
      }

      if (node === undefined) {
        return;
      }
      if (typeof node == "number") {
        return isFinite(node) ? "" + node : "null";
      }
      if (typeof node !== "object") {
        return JSON.stringify(node);
      }

      let i: number;
      let out: string;

      if (Array.isArray(node)) {
        out = "[";

        for (i = 0; i < node.length; i++) {
          if (i) {
            out += ",";
          }

          out += stringify(node[i]) || "null";
        }

        return out + "]";
      }

      if (node === null) {
        return "null";
      }

      if (seen.indexOf(node) !== -1) {
        throw new TypeError("Converting circular structure to JSON");
      }

      const seenIndex = seen.push(node) - 1;
      const keys = Object.keys(node).sort();

      out = "";

      for (i = 0; i < keys.length; i++) {
        const key = keys[i];
        // @ts-ignore
        const value = stringify(node[key]);

        if (!value) {
          continue;
        }

        if (out) {
          out += ",";
        }

        out += JSON.stringify(key) + ":" + value;
      }

      seen.splice(seenIndex, 1);
      return "{" + out + "}";
    })(data) ?? ""
  );
}
