const ajv = require("ajv")();

require("ajv-keywords")(ajv);

const schema = {
  type: "object",
  properties: {
    loginName: {
      type: "string"
    },
    password: {
      type: "string"
    }
  },
  required: ["loginName", "password"],
  additionalProperties: true
};

const validate = ajv.compile(schema);

module.exports = validate;
