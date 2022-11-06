const db = require("../../models/temp-channels");
const config = require("../../config.json");

module.exports = {
  name: "delete-room",
  run: async(client, message, args) => {
    if(!message.member.roles.cache.has(config.private_admin)) return;

    let user = args[0] ? message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => 0) : null;
    if(!user) return message.reply({ content: `❌ **Please provide a user.**` });
    
    let data = await db.findOne({
      guildId: message.guild.id,
      userId: user.user.id
    });
    if(!data) {
      data = await db.create({
        guildId: message.guild.id,
        userId: user.user.id
      });
    }

    let channel = message.guild.channels.cache.get(data.channelId);
    if(!channel) return message.reply({ content: `❌ **This user not has a private channel.**` });

    channel.delete().then(async () => {
      data.channelId = "null";
      data.end_time = 0;
      await data.save();
      user.roles.remove(config.private_role).catch(() => 0);
      message.reply({ content: `✅ **Done delete this user's private channel.**` });
    }).catch(() => {
      message.reply({ content: `🥲 **I can't delete this user's private channel.\nPlease check my permissions and try again.**` });
    });
  }
}