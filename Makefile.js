const fs = require("node:fs");
const path = require("node:path");
const _ = require("lodash");

exports["generate-schemas"] = async () => {
  const tsj = require("ts-json-schema-generator");
  const schemasIndex = require("./tools/schemas-index.json");
  const prettier = require("prettier");

  const templateContent = fs.readFileSync(path.resolve(__dirname, "./tools/schema.ts.tpl"));
  const compiledTemplate = _.template(templateContent);

  /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
  const baseConfig = {
    tsconfig: path.resolve(__dirname, "./apps/teloalapi/tsconfig.app.json"),
    topRef: true,
    skipTypeCheck: true,
  };

  const baseOutputPath = path.resolve(__dirname, "apps/teloalapi/src/schemas/");

  for (const { filePath, typeName, additionalOptions, keepDefinition, asConst } of schemasIndex) {
    console.log(`Processing type '${typeName}' from '${filePath}'`);

    const schema = tsj
      .createGenerator({
        ...baseConfig,
        path: filePath,
        ...additionalOptions,
      })
      .createSchema(typeName);

    let schemaString = JSON.stringify(schema, null, 2);

    if (keepDefinition) {
      schemaString = schemaString.replace(
        /"#\/definitions\/([a-z-_]+)"/gi,
        `"#/components/schemas/$1"`,
      );
    }

    const outputPath = path.resolve(baseOutputPath, `${typeName}.schema.ts`);

    const generatedFile = compiledTemplate({
      typeName,
      schemaString,
      filePath,
      asConst: asConst ?? false,
    });

    const formattedFile = await prettier.format(generatedFile, { filepath: outputPath });

    fs.writeFileSync(outputPath, formattedFile);
  }
};
