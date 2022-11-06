const { model, Schema } = require("mongoose");

module.exports = model("Temp Channels", Schema({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  channelId: { type: String, default: "null" },
  end_time: { type: Number, default: 0 }
}));