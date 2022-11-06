const Discord = require("discord.js");
const db = require("../../models/scammers");
const config = require("../../config.json");

module.exports = {
  name: "بلاغ",
  run: async (client, message, args) => {
    
    message.author.send({ content: `ايدي النصاب؟` }).then(async msg => {
      await message.reply({ content: `اكمل الأسئلة بالخاص.` });
      let collect = await msg.channel.awaitMessages({ filter: m => m.author.id == message.author.id && m.content, max: 1 }).catch(() => 0);
      if(!collect || !collect.size) return;
      collect = collect.first();
      let user = collect.mentions.users.first() || await client.users.fetch(collect.content).catch(() => 0);
      msg.delete().catch(() => 0);
      if(!user) return msg.channel.send({ content: `❌ **Invalid user provided please try again.**` });
      let data = await db.findOne({
        id: user.id
      });
      if(data && data.status) return msg.channel.send({ content: `❌ **هذا العضو نصاب بالفعل.**` });
      if(!data) {
        data = await db.create({
          id: user.id
        });
        await data.save().catch(() => 0);
      }
      if(data.by != "null") return msg.channel.send({ content: `❌ **هذا العضو مقدم ضده بلاغ حالياً، يمكنك الرجوع لاحقاً وتجربة الابلاغ مره اخرى.**` });
      data.by = message.author.id;
      let msg2 = await msg.channel.send({ content: `اسم السلعة وسعرها؟` });
      let collect2 = await msg.channel.awaitMessages({ filter: m => m.author.id == message.author.id && m.content, max: 1 }).catch(() => 0);
      if(!collect2 || !collect2.size) return;
      collect2 = collect2.first();
      data.name_price = collect2.content.substring(0, 200);
      msg2.delete().catch(() => 0);
      let msg3 = await msg.channel.send({ content: `القصة؟` });
      let collect3 = await msg.channel.awaitMessages({ filter: m => m.author.id == message.author.id && m.content, max: 1 }).catch(() => 0);
      if(!collect3 || !collect3.size) return;
      collect3 = collect3.first();
      data.story = collect3.content.substring(0, 1200);
      msg3.delete().catch(() => 0);
      let msg4 = await msg.channel.send({ content: `ارسل صور للأدلة` });
      let collect4 = await msg.channel.awaitMessages({ filter: m => m.author.id == message.author.id && m.attachments.size > 0, max: 1 }).catch(() => 0);
      if(!collect4 || !collect4.size) return;
      collect4 = collect4.first();
      data.photos = collect4.attachments.map(a => a.url);
      msg4.delete().catch(() => 0);
      let btn_1 = new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Success)
        .setCustomId(`accept`)
        .setLabel("Yes");
      let btn_2 = new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Danger)
        .setCustomId(`reject`)
        .setLabel("No");
      let row = new Discord.ActionRowBuilder()
        .addComponents(btn_1, btn_2);
      
      let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.icon ? message.guild.iconURL({ dynamic: true }) : null })
        .setColor("#FF0000")
        .setTitle("عملية نصب جديدة")
        .setDescription(`اسم النصاب: ${user.username}\nايدي النصاب: ${user.id}\n\nاسم المُبلغ: ${message.author.username}\nايدي المُبلغ: ${message.author.id}\n\n\nالسلعة والسعر: ${data.name_price}\nالقصة: ${data.story}\n\nالدلائل: ${data.photos.join("\n")}`);
      
      let msg5 = await msg.channel.send({ content: `هل انت متاكد من ارسال البلاغ؟`, embeds: [embed], components: [row] });
      let collect5 = await msg5.awaitMessageComponent({ filter: b => b.user.id == message.author.id, max: 1 }).catch(() => 0);
      if(!collect5) return;
      if(collect5.customId.startsWith("accept")) {
        let channel = message.guild.channels.cache.get(config.scammer_apply);
        if(!channel) return msg.channel.send({ content: `🥲 **I can't find scammers channel.**` });
        let btn_3 = new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Success)
        .setCustomId(`yes_${user.id}`)
        .setLabel("Accept");
      let btn_4 = new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Danger)
        .setCustomId(`no_${user.id}`)
        .setLabel("Reject");
      let row_1 = new Discord.ActionRowBuilder()
        .addComponents(btn_3, btn_4);
        channel.send({ content: `<@&${config.scammer_admin}>`, embeds: [embed], components: [row_1] });
        await data.save();
        msg5.delete().catch(() => 0);
        msg.channel.send({ content: `✅ **تم إرسال الابلاغ للقضاة.**` });
        message.channel.send({ content: `✅ **تم إرسال الابلاغ للقضاة.** <@${message.author.id}>` });
      } else {
        msg5.delete().catch(() => 0);
        msg.channel.send({ content: `✅ **تم الغاء الابلاغ بنجاح.**` });
      }
    }).catch(err => {
      message.reply({ content: `❌ **قم بفتح خاصك وأعد المحاولة.**` });
    });
  }
}