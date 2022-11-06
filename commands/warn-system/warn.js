const config = require("../../config.json");

module.exports = {
  name: "warn",
  run: async (client, message, args) => {
    if(!message.member.roles.cache.has(config.warn_admin)) return;
    let user = args[0] ? message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => 0) : null;
    if(!user) return message.reply({ content: `❌ **Please provide a user.**` });
    if(user.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerId) return message.reply({ content: `❌ **You can't warn this user.**` });
    let warn_level = user.roles.cache.has(config.warn2) ? 2 : user.roles.cache.has(config.warn1) ? 1 : 0;
    if(warn_level == 0 || warn_level == 1) {
      user.roles.add(warn_level == 0 ? config.warn1 : config.warn2).then(() => {
        message.reply({ content: `✅ Done warn **@${user.user.tag}**` });
      }).catch(() => {
        message.reply({ content: `❌ I can't warn **@${user.user.tag}**` });
      });
    } else {
      user.roles.cache.filter(r => r.id != config.member_role).forEach(ro => user.roles.remove(ro).catch(() => 0));
      message.reply({ content: `✅ Done warn **@${user.user.tag}** and remove his roles.` });
    }
  }
}