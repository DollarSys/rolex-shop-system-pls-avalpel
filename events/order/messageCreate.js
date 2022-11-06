const config = require("../../config.json");

module.exports = {
  name: "messageCreate",
  run: async(client, message) => {
    if(!message.guild) return;
    if(message.channel != config.order_room) return;
    setTimeout(() => message.delete().catch(async (err) => console.log("I Can't ")), 15000);
    }
}