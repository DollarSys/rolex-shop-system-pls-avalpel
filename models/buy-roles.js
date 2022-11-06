const { model, Schema } = require("mongoose");

module.exports = model("Roles Data", Schema({
  id: { type: String, required: true },
  roles: { type: Array, default: [] }
}));