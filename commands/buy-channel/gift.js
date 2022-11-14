const Discord = require("discord.js");
const db = require("../../models/temp-channels");
const map = new Map();
const config = require("../../config.json");
const private_time = 7 * 86400000;

module.exports = {
  name: "gift",
  run: async(client, message, args) => {
    if(!message.member.roles.cache.has(config.scammer_admin1)) return;
    let data = await db.findOne({
      guildId: message.guild.id,
      userId: message.author.id
    });
    if(!data) {
      data = await db.create({
        guildId: message.guild.id,
        userId: message.author.id
      });
    }
    if(data.end_time > Date.now() && message.guild.channels.cache.get(data.channelId)) return message.reply({ content: `❌ **You already have a private room <#${data.channelId}> .**` });
    if(parseInt(map.get(message.author.id)) > Date.now()) return message.reply({ content: `❌ **You must complete the purchase before try again.**` });
    map.set(message.author.id, Date.now() + 121000);
    let price = 1;
    let tax = Math.ceil(price/0.95);
    let embed = new Discord.EmbedBuilder()
      .setDescription(`**قم بتحويل المبلغ الاتي لشراء روم خاص لمدة أسبوع.\nامامك 60 ثانية.**\n\`c ${config.bank_id} ${tax}\``)
      .setAuthor({ name: message.guild.name, iconURL: message.guild.icon ? message.guild.iconURL({ dynamic: true }) : null });
    message.reply({ embeds: [embed] }).then(async msg2 => {
      let trans_msg = `**:moneybag: | ${message.author.username}, has transferred \`$${price}\` to <@!${config.bank_id}> **`;
      let collect2 = await message.channel.awaitMessages({ filter: mm => mm.author.id == config.probot_id && mm.content == trans_msg, max: 1, time: 60000, errors: ["time"] }).catch(() => {
        map.set(message.author.id, 0);
        msg2.delete().catch(() => 0);
        message.reply({ content: `⏰ - **Timeup.**` });
      });
      if(!collect2 || !collect2.size) return;
      collect2 = collect2.first();
      if(!collect2) return;
      msg2.delete().catch(() => 0);
      map.set(message.author.id, 0);
      message.guild.channels.create({
        name: `${message.author.username}`,
        parent: config.private_category,
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: [Discord.PermissionsBitField.Flags.SendMessages]
          },
          {
            id: message.author.id,
            allow: [Discord.PermissionsBitField.Flags.SendMessages]
          }
        ],
        rateLimitPerUser: 14400
      }).then(async channel => {
        message.member.roles.add(config.private_role).catch(() => 0);
        message.member.roles.add(config.seller_role).catch(() => 0);
        data.channelId = channel.id;
        data.end_time = Date.now() + private_time;
        await data.save().catch(() => 0);
        message.reply({ content: `✅ **Thanks for completing payment, done create your private channel ${channel}.**` });
        message.author.send(`✅ **Thanks for completing payment, done create your private channel ${channel}.**
        You Cant use Command! \`$rename-room\` to change yor name rome!
        `)
        let embed1 = new Discord.EmbedBuilder()
          .setAuthor({ name: `نظام الرومات الخاصة`, iconURL: message.guild.icon ? message.guild.iconURL({ dynamic: true }) : null })
          .addFields([
            {
              name: `مالك الروم:`,
              value: `${message.author}`
            },
            {
              name: `مدة الروم:`,
              value: `7 days`
            },
            {
              name: `تاريخ الإنتهاء:`,
              value: `<t:${Math.floor(data.end_time / 1000)}:f>`
            }
          ])
          .setColor("#FF0000");
        channel.send({ embeds: [embed1] }).catch(err => 0);
        setTimeout(async () => {
          let data1 = await db.findOne({
            guildId: data.guildId,
            userId: data.userId
          });
          if(data1.end_time > Date.now()) return;
          let guild = client.guilds.cache.get(data1.guildId);
          if(!guild) return;
          let channel1 = guild.channels.cache.get(data1.channelId);
          if(!channel1) return;
          await channel1.delete().catch(() => 0);
          data1.channelId = "null";
          data1.end_time = 0;
          await data1.save();
          let member = await guild.members.fetch(data1.userId).catch(() => 0);
          if(!member) return;
          member.roles.remove(config.private_role).catch(() => 0);
        }, data.end_time - Date.now());
      }).catch(err => {
        console.log(err);
        message.reply({ content: `🥲 **Thanks for completing payment.\nI can't create the private channel to you.\nContact with the owner to return money to you.**` });
      });
    }).catch((err) => {
      console.log(err);
      map.set(message.author.id, 0);
    });
  }
}
