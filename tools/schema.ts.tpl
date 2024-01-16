// This file is auto-generated. Do not edit.
// Schema of type '<%= typeName %>' from file '<%= filePath %>'

<% if (!asConst) { %>
import { SchemaObject } from "@loopback/rest";
<% } %>

export const <%= typeName[0].toLowerCase() + typeName.slice(1) %>Schema<% if (!asConst) { %>: SchemaObject<% } %> = <%= schemaString %><% if (asConst) { %> as const<% } %>;
