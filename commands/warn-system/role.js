const config = require("../../config.json");
const db = require("../../models/buy-roles");

module.exports = {
  name: "role",
  run: async (client, message, args) => {
    if(!message.member.roles.cache.has(config.warn_admin)) return;
    let user = args[0] ? message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => 0) : null;
    if(!user) return message.reply({ content: `❌ **منشن الشخص الذي تريد إعطائة رتبة.**` });
    if(user.user.id == message.author.id) return message.reply({ content: `❌ لا تستطيع إعطاء رتب لنفسك.` });
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
    if(!role || role.managed) return message.reply({ content: `❌ منشن الرتبة او اكتب اسمها.` });
    let data = await db.findOne({
      id: message.guild.id
    });
    if(!data || (!data.roles.find(r => r.role == role.id) && config.seller_role != role.id)) return message.reply({ content: `❌ **Please provide valid seller role.**` });
    if(!user.roles.cache.has(role.id)) {
      user.roles.add(role).catch(() => 0);
      user.roles.add(config.seller_role).catch(() => 0);
      message.reply({ content: `Done add **${role.name}** to **<@${user.user.id}>** ✅` });
    } else {
      user.roles.remove(role).catch(() => 0);
      message.reply({ content: `Done remove **${role.name}** from **<@${user.user.id}>** ❌` });
    }
  }
}
