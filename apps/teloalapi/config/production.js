const boolVal = (val, def) => (val ? val === "true" : def);

// `undefined` means the default value is ignored and an environment variable is required
module.exports = {
  host: undefined,
};
