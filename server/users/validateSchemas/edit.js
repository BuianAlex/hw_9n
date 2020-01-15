const ajv = require("ajv")();

require("ajv-keywords")(ajv);

const schema = {
  type: "object",
  properties: {
    loginName: {
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
  required: ["loginName"],
  additionalProperties: true
};

const validate = ajv.compile(schema);

module.exports = validate;
