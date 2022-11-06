const Discord = require("discord.js");
const config = require("../../config.json");
const luckydata = new Set();
const map = new Map();
const mess = [
  "**مبروك لقد ربحت. : `Good's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `Good's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `Great's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `Great's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `'Programmer's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `'Designer's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `'Exellent's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `'25 الف .`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.**",
  "**مبروك لقد ربحت. : `'Designer's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999295768378753114> -**",
  "**مبروك لقد ربحت. : `إعلان منشن`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#996726504400625764> -**",
  "**مبروك لقد ربحت. : `منشور مميز`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#996726641545990185> -**",
  "**مبروك لقد ربحت. : `طلب مميز`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#996727952324698163> -**",
  "**مبروك لقد ربحت. : `لفة مجانية`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#999294509223530597> -**",
  "**مبروك لقد ربحت. : `إعلان منشن للجميع`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#996726504400625764> -**",
];
const line = ("https://cdn.discordapp.com/attachments/999793644640935976/1000419144631599134/ROLEXLINE1.png");


module.exports = {
  name: "lucky",
  run: async(client, message) => {
    if(!message.channel.name.startsWith("ticket-")) return message.reply("لا يمكن إستخدام الأمر خارج التذكرة ، إفتح تذكرة من هنا <#999294539040829450>")
    if (luckydata.has(message.author.id)) return;
    let embed = new Discord.EmbedBuilder()
    .setTitle(`# Roléx Owner's.`)
    .setDescription(`**للـ بدء عليك إولا ، تحويل مبلغ 25 الف. لـ <@773516646416384030>
    في حال خمولك لـ مدة اكثر من 3 دقايق ، سيتم إعلاق الجولة تلقائي.**`);
    message.reply({content: `c 773516646416384030 26316 ,${message.author}`, embeds: [embed]}).then(async msg => {
      let trans_msg = `**:moneybag: | ${message.author.username}, has transferred \`$25000\` to <@!${config.bank_id}> **`;
      let collect = await message.channel.awaitMessages({ filter: mm => mm.author.id == config.probot_id && mm.content == trans_msg, max: 1, time: 60000 * 3, errors: ["time"] }).catch(() => {
        map.set(message.author.id, 0);
        msg.delete().catch(() => 0);
        message.reply({ content: `إنتهي وقت التحويل، في حال اردت اللعب مرة اخري قم بكتابة \`$lucky\`` });
      })
      collect = collect.first();
      if (!collect) return;
      map.set(message.author.id, 0);
      message.channel.send("50 الف.").then((msgg) => {
        let a1 = ("Good's");
        let a2 = ("100 الف.");
        let a3 = ("150 الف.");
        let a4 = ("70 الف .");
        let a5 = ("30 الف .");
        let a6 = ("Exellent's");
        let a7 = ("نيترو كلاسك");
        let a8 = ("25 الف.");
        let a9 = ("15 الف.");
        let a10 = ("نيترو قيمنق.");
        let a12 = ("40 الف.");
        setTimeout(() => msgg.edit(a1).catch(() => 0), 1000);
        setTimeout(() => msgg.edit(a2).catch(() => 0), 1500);
        setTimeout(() => msgg.edit(a3).catch(() => 0), 3500);
        setTimeout(() => msgg.edit(a4).catch(() => 0), 4500);
        setTimeout(() => msgg.edit(a5).catch(() => 0), 5500);
        setTimeout(() => msgg.edit(a6).catch(() => 0), 6500);
        setTimeout(() => msgg.edit(a7).catch(() => 0), 7500);
        setTimeout(() => msgg.edit(a8).catch(() => 0), 8500);
        setTimeout(() => msgg.edit(a9).catch(() => 0), 9500);
        setTimeout(() => msgg.edit(a10).catch(() => 0), 10500);
        setTimeout(() => msgg.edit(a12).catch(() => 0), 11500);
        setTimeout(() => msgg.delete().catch(() => 0), 12500);
        let va1 = mess[Math.floor(Math.random() * mess.length)];
        setTimeout(() => message.channel.send(`${va1}`).catch(() => 0), 13000);
        setTimeout(() => message.channel.send(`${line}`).catch(() => 0), 13000);
    })
      luckydata.add(message.author.id)
      setTimeout(() => {
      luckydata.delete(message.author.id)
    },60000 * 3)
    })
  }
}
