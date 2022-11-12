const Discord = require("discord.js");
const db = require("../../models/scammers");
const config = require("../../config.json");

module.exports = {
  name: "interactionCreate",
  run: async(client, inter) => {
    if(!inter.isButton()) return;
    if(inter.customId.startsWith("yes")) {
      let id = inter.customId.split("_")[1];
      let data = await db.findOne({
        id: id
      });
      if(!data || data.by == "null") {
        return inter.reply({ content: `❌ **I can't find data of this user.**`, ephemeral: true });
      }
      let user = await client.users.fetch(id).catch(() => 0);
      if(!user) return inter.reply({ content: `❌ **I can't find the user.**`, ephemeral: true });
      let author = await client.users.fetch(data.by).catch(() => 0);
      if(!author) return inter.reply({ content: `❌ **I can't find the author of report.**`, ephemeral: true });
      let channel = inter.guild.channels.cache.get(config.scammer_channel);
      if(!channel) return inter.reply({ content: `❌ **I can't find scammer channel.**`, ephemeral: true });
      inter.reply({ content: `✅ **تم قبول هذا البلاغ بنجاح.**`, ephemeral: true });
      let embed = new Discord.EmbedBuilder()
      .setTitle(`# Rolex Owner's`)
      .setDescription(`\`===========================\`
اسم النصاب: **${user.username}** - ايدي النصاب: ${user.id}
\`===========================\`
اسم المٌبلغ: **${author.username}** - ايدي المُبلغ: ${author.id}
\`===========================\`
السلعة والسعر: **${data.name_price}**
\`===========================\`
القصة: **${data.story}**
\`===========================\`
الدلائل:`)
      await channel.send({ content: `<@&${config.scammer_role}> **بلاع علي نصاب.**`, embeds: [embed]})
      // , files: `${data.photos.join("\n")}` 
      await channel.send({ content: `وانت الإن يمكنك التبليغ علي اي شخص نصب عليك عن طريقة كتابة ، \`#بلاغ\` هنا <#1034108906076651550>` })
      data.status = true;
      await data.save().catch(() => 0);
      inter.message.edit({ content: `Accepted.`, components: [] }).catch(() => 0);
      author.send({ content: `**تم قبول البلاغ المقدم من طرفك ضد ${user.tag}\nتم قبوله بواسطة: ${inter.user}.**` }).catch(() => 0);
      user.send({ content: `**تم قبول البلاغ المقدم ضدك من طرف ${author.tag}\nتم قبوله بواسطة: ${inter.user}.**` }).catch(() => 0);
    } else if(inter.customId.startsWith("no")) {
      let id = inter.customId.split("_")[1];
      let data = await db.findOne({
        id: id
      });
      if(!data || data.by == "null") {
        return inter.reply({ content: `❌ **I can't find data of this user.**`, ephemeral: true });
      }
      let author = await client.users.fetch(data.by).catch(() => 0);
      data.by = "null";
      data.name_price = "null";
      data.story = "null";
      data.photos = [];
      data.status = false;
      await data.save().catch(() => 0);
      await inter.reply({ content: `✅ **Done reject this report.**`, ephemeral: true });
      inter.message.edit({ content: `Rejected.`, components: [] }).catch(() => 0);
      if(author) {
        author.send({ content: `**تم رفض البلاغ المقدم من طرفك ضد <@${data.id}>\nتم رفضه بواسطة: ${inter.user}.**` }).catch(() => 0);
      }
    }
  }
}
