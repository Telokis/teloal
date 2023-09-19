import { isObject } from "lodash";

/**
 * Will generate a string where some entries have their
 * own lines and others don't.
 * This function is mainly useful to be able to (human) read or
 * store very large json while compressing them a bit.
 * 
 * @example
 * 
    smartMinify({
        "raw": [1, 2, 3],
        "deep": {
            "again": {
                "level": ["a", "b", { "key": "val" }],
                "hello": "world"
            }
        },
        "one": 1
    }, 2)

{
"raw":[
1,
2,
3
],
"deep":{
"again":{
"level":["a","b",{"key":"val"}],
"hello":"world"
}
},
"one":1
}

// if depth were 1, the result would be:

{
"raw":[
1,
2,
3
],
"deep":{
"again":{"level":["a","b",{"key":"val"}],"hello":"world"}
},
"one":1
}

 * 
 * @param data The data to stringify/minify
 * @param depth The depth to minify from. Using null means infinite
 * @returns
 */
export function smartMinify<T>(data: T, depth: number | null = 0): string {
  let realDepth = 9999999;

  if (depth !== null) {
    realDepth = depth;
  }

  if (Array.isArray(data)) {
    return `[\n${data
      .map((a) => (realDepth > 0 ? smartMinify(a, realDepth - 1) : JSON.stringify(a)))
      .join(",\n")}\n]`;
  }
  if (isObject(data)) {
    return `{\n${Object.entries(data)
      .map(
        ([key, val]) =>
          `"${key}":${realDepth > 0 ? smartMinify(val, realDepth - 1) : JSON.stringify(val)}`,
      )
      .join(",\n")}\n}`;
  }

  return JSON.stringify(data);
}
