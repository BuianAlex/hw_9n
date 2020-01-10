const ajv = require("ajv")();

require("ajv-keywords")(ajv);

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    loginName: {
      type: "string"
    },
    password: {
      type: "string"
    },
    email: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    usergroup: {
      type: "string"
    }
  },
  required: ["loginName", "password"],
  additionalProperties: true
};

const validate = ajv.compile(schema);

module.exports = validate;
