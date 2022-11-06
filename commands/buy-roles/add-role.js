const db = require("../../models/buy-roles");
const config = require("../../config.json");

module.exports = {
  name: "add-role",
  run: async(client, message, args) => {
    if(!config.owners.includes(message.author.id)) return;
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role || role.managed) return message.reply({ content: `❌ **Please provide a role.**` });
    let price = !isNaN(args[1]) ? Math.floor(parseInt(args[1])) : null;
    if(!price) return message.reply({ content: `❌ **Please provide the price.**` });

    let data = await db.findOne({
      id: message.guild.id
    });
    if(!data) {
      data = await db.create({
        id: message.guild.id
      });
      await data.save().catch(() => 0);
    }
    if(data.roles.find(d => d.role == role.id)) return message.reply({ content: `❌ **You already add this role before.**` });
    if(data.roles.length >= 25) return message.reply({ content: `❌ **You reached max limit of roles.**` });
    await data.roles.push({
      role: role.id,
      price
    });
    await data.save().catch(() => 0);
    message.reply({ content: `✅ **Done add this role.**` });
  }
}