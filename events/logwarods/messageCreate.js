/*const { logcatogry, logwards_room, logrool } = require("../../config.json");
const config = require("../../config.json");
const Discord = require("discord.js")
const words = ["متجر","شوب","بيع","شراء","حساب","اكونت","حسابات","نيترو","سعر","اكونتات","نيترو","نيتروهات","سيرفر","متوفر","سيرفرات","كراك","تكريك","هكر","توكنات","توكن","@everyone"];
const role_staff1 = ("1034070324398010409");

module.exports = {
  name: "messageCreate",
  run: async(client, message, inter) => {
    if(message.author.bot || !message.guild) return;
    if(!message.member.roles.cache.some((role) => role.id === config.seller_role)) return;
    let i;
    for(i=0; i< words.length; ++i) {
    if(!message.content.includes(words[i])) return;
      let embed = new Discord.EmbedBuilder()
      .setTitle(`# Rolex Owner's.`)
      .setImage("https://cdn.discordapp.com/attachments/986263839207211028/1026819732260798585/unknown.png")
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setDescription(`**
      مراقََب البائـ3ين ، قام إحد البائـ3ين بمخالفة القواعد ، اسم البائـ3 : ${message.author}
      نوع المخالفة : ذكر كلمات ممنوعة! 
      اسم الشخص: ${message.author} ، ايدي الشخص : ${message.author.id}

      الروم الذي قام بالنشر فيها : ${message.channel},
      رابط مباشر لـ رسالة البائـ3 :        **
      \`\`\`${message.url}\`\`\`
      **الرسالة الذي قام بنشرهاََ:** 
      \`\`\`${message}\`\`\`
      في حال قمت بتحذير هذة البائـ3 ، اضغط علي الزر بالإسفل. 👇`)
      .setFooter({text: `Requested By : ${message.author.username} - # Rolex Owner's .`, iconURL: `${message.author.displayAvatarURL()}`});
      let loggggggwardss = new Discord.ButtonBuilder()
      .setStyle(Discord.ButtonStyle.Primary)
      .setCustomId(`logwords`)
      .setLabel("✅ تم تحذير هذة البائـ3");
      let row = new Discord.ActionRowBuilder()
      .addComponents(loggggggwardss);
    let channel = client.channels.cache.get(logwards_room);
    if (!channel) return;
    await channel.send({content: `<@&${role_staff1}> مراقََب البائـ3ين ، قام إحد البائـ3ين بمخالفة القواعد،:`, embeds:[embed], components: [row]}).then(async (msg) => {
      let collect = await msg.awaitMessageComponent().catch(() => 0);
      if(!collect) return;
      if(collect.customId.startsWith("logwords")) {
      await msg.delete().catch(async (err) => console.log("I Can't "));
      }
    })
    }
  }
}

*/
