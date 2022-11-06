const db = require("../../models/buy-roles");
const config = require("../../config.json");

module.exports = {
  name: "remove-role",
  run: async(client, message, args) => {
    if(!config.owners.includes(message.author.id)) return;
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role || role.managed) return message.reply({ content: `❌ **Please provide a role.**` });

    let data = await db.findOne({
      id: message.guild.id
    });
    if(!data) {
      data = await db.create({
        id: message.guild.id
      });
      await data.save().catch(() => 0);
    }
    let index = data.roles.findIndex(d => d.role == role.id);
    if(index == -1) return message.reply({ content: `❌ **You don't add this role before.**` });
    
    await data.roles.splice(index, 1);
    await data.save().catch(() => 0);
    message.reply({ content: `✅ **Done remove this role.**` });
  }
}