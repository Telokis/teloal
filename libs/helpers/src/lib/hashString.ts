export function hashString(str: string) {
  let hash = 0;
  let i = 0;
  const len = str.length;

  while (i < len) {
    hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
  }

  return hash + 2147483647 + 1;
}
