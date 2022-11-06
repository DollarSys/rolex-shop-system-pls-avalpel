const db = require("../../models/scammers");
const config = require("../../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "فحص",
  run: async(client, message, args) => {
    let user = args[0] ? message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => 0) : null;
    if(!user) return message.reply({ content: `❌ **Please provide a user.**` });

    let data = await db.findOne({
      id: user.id
    });
    if(!data || !data.status) return message.reply({ content: `✅ **هذا العضو لم تتم إضافته لقائمة النصابين.\nهذا لا يعني أنه موثوق يفضل اخذ وسيط لضمان حقك.**` });
    
    let author = await client.users.fetch(data.by).catch(() => null);
    let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
        .setColor("#FF0000")
        .setTitle("تم العثور على هذا الشخص في قائمة النصابين")
        .setDescription(`
اسم المُبلغ: **${author?.username}**
ايدي المُبلغ: **${author?.id}**

السلعة والسعر:
**${data.name_price}**
القصة:
**${data.story}**
الدلائل:
${data.photos.join("\n")}
`);
    message.reply({ embeds: [embed] });
  }
}