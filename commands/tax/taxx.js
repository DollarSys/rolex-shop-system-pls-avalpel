const Discord = require("discord.js")
const config = require("../../config.json");
const probot = require("probot-tax");

module.exports = {
  name: "ضريبة",
  run: async(client, message, args1) => {
    let args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply('> Please write the amount')
    let embed = new Discord.EmbedBuilder()
      .setTitle(`# Rolex Owner's .`)
      .setImage("https://cdn.discordapp.com/attachments/986263839207211028/1026819732260798585/unknown.png")
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setDescription(`
      ** > ProBot Tax Calculator :
      
      > <:RolexsNews:1012969635349528587> Amount to be paid , <:wa_text8:1017477518078513285>  \`${args}\`
      
      > <:RolexsNews:1012969635349528587> The amount includes tax , <:wa_text8:1017477518078513285> \`${probot.taxs(args)}\`**`)
      .setFooter({text: `Requested By : ${message.author.username} - # Rolex Owner's .`});
    message.reply({embeds: [embed]});
  }
}