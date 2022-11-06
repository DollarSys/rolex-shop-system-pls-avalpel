const db = require("../../models/temp-channels");

module.exports = {
  name: "rename-room",
  run: async (client, message, args) => {
    let name = args.join(" ");
    if(!name) return message.reply({ content: `❌ **Please provide the name.**` });
    if(name.length > 100) return message.reply({ content: `❌ **You have provided long name.**` });
    
    let data = await db.findOne({
      guildId: message.guild.id,
      userId: message.author.id
    });

    let channel = data ? message.guild.channels.cache.get(data.channelId) : null;
    if(!channel) return message.reply({ content: `❌ **You don't have private channel.**` });
    channel.setName(name).catch(() => 0);
    message.reply({ content: `✅ **Done change your private channel's name.**` });
  }
}