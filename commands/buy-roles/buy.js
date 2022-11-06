const Discord = require("discord.js");
const db = require("../../models/buy-roles");
const map = new Map();
const config = require("../../config.json");

module.exports = {
  name: "buy",
  run: async (client, message, args) => {
    let data = await db.findOne({
      id: message.guild.id
    });
    if (data) {
      data.roles = data.roles.filter(r => message.guild.roles.cache.get(r.role));
      await data.save().catch(() => 0);
    }
    if (!data || !data.roles.length) return message.reply({ content: `❌ **The owner not add any role yet.**` });
    if (parseInt(map.get(message.author.id)) > Date.now()) return message.reply({ content: `❌ **You must complete the purchase before try again.**` });
    map.set(message.author.id, Date.now() + 121000);
    let menu = new Discord.SelectMenuBuilder()
      .setCustomId(`order`)
      .setPlaceholder('اختر الرتبة التي تريد شراءها')
      .addOptions(data.roles.map(r => ({
        label: `${message.guild.roles.cache.get(r.role) ? message.guild.roles.cache.get(r.role).name : r.role}`,
        description: `Get ${message.guild.roles.cache.get(r.role) ? message.guild.roles.cache.get(r.role).name : r.role} right now for only ${r.price} credits!`,
        value: r.role
      })));
    let row = new Discord.ActionRowBuilder()
      .addComponents(menu);
    let embed = new Discord.EmbedBuilder()
      .setDescription(`اختر الرتبة التي تريد شراءها من القائمة التالية.`)
      .setAuthor({ name: message.guild.name, iconURL: message.guild.icon ? message.guild.iconURL({ dynamic: true }) : null });
    message.reply({ embeds: [embed], components: [row] }).then(async msg => {
      let collect = await msg.awaitMessageComponent({ filter: b => b.user.id == message.author.id, max: 1, time: 60000, errors: ["time"] }).catch((err) => map.set(message.author.id, 0));
      if (!collect) return;
      if (collect.customId == "order") {
        let value = data.roles.find(r => r.role == collect.values[0]);
        msg.delete().catch(() => 0);
        let price = value.price;
        let tax = Math.ceil(price / 0.95);
        message.reply({ content: `**قم بتحويل المبلغ التالي لكي تتم عملية الشراء.\nامامك 60 ثانية فقط.**\n\`c ${config.bank_id} ${tax}\`` }).then(async msg2 => {
          let trans_msg = `**:moneybag: | ${message.author.username}, has transferred \`$${price}\` to <@!${config.bank_id}> **`;
          let collect2 = await message.channel.awaitMessages({ filter: mm => mm.author.id == config.probot_id && mm.content == trans_msg, max: 1, time: 60000, errors: ["time"] }).catch(() => {
            map.set(message.author.id, 0);
            msg2.delete().catch(() => 0);
            message.reply({ content: `⏰ - **Timeup.**` });
          });
          if (!collect2 || !collect2.size) return;
          collect2 = collect2.first();
          if (!collect2) return;
          collect2.delete().catch(() => 0);
          msg2.delete().catch(() => 0);
          map.set(message.author.id, 0);
          message.member.roles.add(value.role).then(() => {
            message.member.roles.add(config.seller_role).catch(() => 0);
            message.reply({ content: `✅ **Thanks for completing payment, done add this role to you.**` });
          }).catch(() => {
            message.reply({ content: `🥲 **Thanks for completing payment.\nI can't add the role to you.\nContact with the owner to add it to you.**` });
          });
        });
      }
    }).catch((err) => {
      console.log(err);
      map.set(message.author.id, 0);
    });
  }
}