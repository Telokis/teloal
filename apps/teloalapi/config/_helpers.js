exports.parseIntDefault = function parseIntDefault(str, defaultValue) {
  const res = parseInt(str, 10);

  if (Object.is(NaN, res)) {
    return defaultValue;
  }

  return res;
};

exports.parseBoolDefault = function parseBoolDefault(str, defaultValue) {
  if (str === "true") {
    return true;
  }

  if (str === "false") {
    return false;
  }

  return defaultValue;
};

exports.urlDefault = function urlDefault(maybeUrl, defaultValue) {
  if (!maybeUrl) {
    return defaultValue;
  }

  return maybeUrl.endsWith("/") ? maybeUrl.substring(0, -1) : maybeUrl;
};
