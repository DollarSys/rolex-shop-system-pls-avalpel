const config = require("../../config.json");

module.exports = {
  name: "messageCreate",
  run: async(client, message) => {
    if(message.author.bot || !message.guild) return;
    if(!message.member.roles.cache.some((role) => role.id === config.partner_role)) return;
    if (!message.content.includes('@everyone')) return;
    let menenn = message.guild.roles.cache.find(role => role.name === '@everyone');
    if(!menenn) return;
    await message.author.send(`سيتم مسح هذة الروم بعد 30 دقيقة بالظبط ${message.channel}`)
    setTimeout(() => message.channel.delete().catch(async (err) => console.log("I Can't ")), 60000 * 30)
  }
}
