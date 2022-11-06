const Discord = require("discord.js");
const config = require("../../config.json");
const luckydata = new Set();
const map = new Map();
const mess = [
  "**مبروك لقد ربحت. : `Good's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `Good's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `Great's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `Great's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `'Programmer's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `'Designer's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `'Exellent's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `'25 الف .`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.**",
  "**مبروك لقد ربحت. : `'Designer's`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `إعلان منشن`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `منشور مميز`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `طلب مميز`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `لفة مجانية`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
  "**مبروك لقد ربحت. : `إعلان منشن للجميع`. :tada: ، إنتظر المسؤولين لإستلام الجائزة.\n لـ معرفة تفاصيل عن جائزتك ، شيك <#1037115268041805927> -**",
];
const line = ("https://cdn.discordapp.com/attachments/999793644640935976/1000419144631599134/ROLEXLINE1.png");



module.exports = {
  name: "lucky",
  run: async(client, message) => {
    if(!message.channel.name.startsWith("ticket-")) return message.reply("لا يمكن إستخدام الأمر خارج التذكرة ، إفتح تذكرة من هنا <#999294539040829450>")
    if (luckydata.has(message.author.id)) return;
    let embed = new Discord.EmbedBuilder()
    .setTitle(`# Roléx Owner's.`)
    .setImage(`https://cdn.discordapp.com/attachments/999294509223530597/1037111209108979732/Record_2022_11_01_23_06_23_255.gif`)
    .setDescription(`**للـ بدء عليك إولا ، تحويل مبلغ 25 الف. لـ \<@773516646416384030> \`-#\`
معك 3 دقائق فقط ، لتحويل مبلغ 25 الف كريدت بالضرايب:
للتحويل، اكتب:
\`C 773516646416384030 26316\` 
ويوجد هنا شرح تفصيلي لـ كيفية اللعب. \<#999294509223530597>**`);
    
    if(parseInt(map.get(message.author.id)) > Date.now()) return message.reply({ content: `❌ توجد جولة بالفعل، عليك التحويل لإتمام الجولة معك 3 دقائق.` });
    map.set(message.author.id, Date.now() + 60000 * 3);
    message.reply({content: `c 773516646416384030 26316 ,${message.author}`, embeds: [embed]}).then(async msg => {
      let trans_msg = `**:moneybag: | ${message.author.username}, has transferred \`$25000\` to <@!773516646416384030> **`;
      let collect = await message.channel.awaitMessages({ filter: mm => mm.author.id == config.probot_id && mm.content == trans_msg, max: 1, time: 60000 * 3, errors: ["time"] }).catch(() => {
        map.set(message.author.id, 0);
        msg.delete().catch(() => 0);
        message.reply({ content: `إنتهي وقت التحويل، في حال اردت اللعب مرة اخري قم بكتابة \`$lucky\`` });
      })
      collect = collect.first();
      if (!collect) return;
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
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 1000);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 1500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 3500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 4500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 5500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 6500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 7500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 8500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 9500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 10500);
        setTimeout(() => msgg.edit({content: ${message.author}, ${a1}}).catch(() => 0), 11500);
        setTimeout(() => msgg.delete().catch(() => 0), 12500);
        let va1 = mess[Math.floor(Math.random() * mess.length)];
        setTimeout(() => message.channel.send({ content: `${message.author}, ${va1}`}).catch(() => 0), 13000);
        setTimeout(() => message.channel.send({ content: `${line}`}).catch(() => 0), 13000);
      })
      map.set(message.author.id, 0);
    })
  }
}
