const { model, Schema } = require("mongoose");

module.exports = model("Scammers", Schema({
  id: { type: String, required: true },
  status: { type: Boolean, default: false },
  by: { type: String, default: "null" },
  name_price: { type: String, default: "null" },
  story: { type: String, default: "null" },
  photos: { type: Array, default: [] }
}));