const { logcatogry, logshare_room, logrool } = require("../../config.json");
const config = require("../../config.json");

const Discord = require("discord.js")
module.exports = {
  name: "messageCreate",
  run: async(client, message) => {
    if(message.author.bot || !message.guild) return;
    if(!message.member.roles.cache.some((role) => role.id === config.seller_role)) return;
    if (!message.content.includes('here')) return;
    let embed = new Discord.EmbedBuilder()
      .setTitle(`# Rolex Owner's.`)
      .setImage("https://cdn.discordapp.com/attachments/986263839207211028/1026819732260798585/unknown.png")
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setDescription(`**
      مراقََب البائـ3ين ، قام إحد البائـ3ين بالنشر ، اسم البائـ3 : ${message.author}
      اسم الشخص: ${message.author} ، ايدي الشخص : ${message.author.id}

      الروم الذي قام بالنشر فيها : ${message.channel},
      رابط مباشر لـ رسالة البائـ3 :        **
      \`\`\`${message.url}\`\`\`
      **الرسالة الذي قام بنشرهاََ:** 
      \`\`\`${message}\`\`\``)
      .setFooter({text: `Requested By : ${message.author.username} - # Rolex Owner's .`, iconURL: `${message.author.displayAvatarURL()}`});
    let channel = client.channels.cache.get(logshare_room);
    if (!channel) return;
    await channel.send({content: `مراقََب البائـ3ين ، قام إحد البائـ3ين بالنشر في: ${message.channel}`, embeds:[embed]})
  }
}