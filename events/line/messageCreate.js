const config = require("../../config.json");

module.exports = {
  name: "messageCreate",
  run: async(client, message) => {
    if(message.author.bot || !message.guild) return;
    if(message.content.startsWith('خط')) {
      if(!message.member.roles.cache.some((role) => role.id === config.seller_role)) return;
      await message.channel.send("\`-\` شيكو هنا ، لعبة عجلة الحظ بـ نظام طرب <#999294509223530597> 👌.")
      await message.channel.send({ content: "https://cdn.discordapp.com/attachments/1007634941368078337/1038732094593056798/unknown.png" })
      await message.delete().catch(async (err) => console.log("I Can't "));
    }
  }
}
