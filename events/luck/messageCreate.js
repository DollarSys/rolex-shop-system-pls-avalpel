const config = require("../../config.json");
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
  name: "messageCreate",
  run: async(client, message) => {
    if(message.author.bot || !message.guild) return;
    if(message.content.startsWith('$owners-spin')) {
      if(!message.member.roles.cache.some((role) => role.id === config.seller_role)) return;
      await message.channel.send(mess[Math.floor(Math.random() * mess.length)])
      await message.channel.send({ content: "https://cdn.discordapp.com/attachments/999793644640935976/1000419144631599134/ROLEXLINE1.png" })
      await message.delete().catch(async (err) => console.log("I Can't "));
    }
  }
}