export const autoPadding = (input: unknown, width: number, align: "left" | "right") => {
  const str = String(input);

  if (str.length >= width) {
    return str;
  }

  if (align === "left") {
    return str.padEnd(width, " ");
  }

  return str.padStart(width, " ");
};
