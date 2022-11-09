const Discord = require("discord.js");
const config = require("../../config.json");
const map = new Map();


module.exports = {
  name: "messageCreate",
  run: async(client, message) => {
    if(message.author.bot || !message.guild) return;
    if(!message.member.roles.cache.some((role) => role.id === config.seller_role)) return;
    if(!message.content.includes('here')) return;
    let channel = client.channels.cache.get("1034187640863477771");
    if(!channel) return;
    channel.send({ content: `**مساعد الإدارة الذكي ، التحقق من إرسال خط للبائعََين: <:RolexsTrue:1017527128683724820>
    قام الشخص : ${message.author.username} , بالنشر في روم ${message.channel}
    وجاري التحقق خلالل 5 دقائق للتاكد من ارسالة الخط إو لا في مدة 5 دقائق!**
    https://cdn.discordapp.com/attachments/986263839207211028/1026819732260798585/unknown.png` }).then(async msg => {
      let trans_msg = `1`;
      let collect = await message.channel.awaitMessages({ filter: mm => mm.author.id == message.author.id && mm.content == trans_msg, max: 1, time: 60000 * 5, errors: ["time"] }).catch(() => {
        map.set(message.author.id, 0);
        msg.delete().catch(() => 0);
        let logline = new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Primary)
        .setCustomId(`logline`)
        .setLabel("✅ تم تحذير هذة البائـ3");
        let row = new Discord.ActionRowBuilder()
        .addComponents(logline);
        channel.send({ content: `لم يقم الشخص <@${message.author.id}> بوضع الخط , عليكم تحذيرة <@&1034070324398010409> ‼
        إضعط علي الزر بالإسفل ✅ ، في حال قمت بالتعامل معة لتسهيل التعامل مع جميع التحذيرات
        في حال الضعط علي الرياكشن سيتم حذف الرسالة لذالك لا تقم بالضغط إلا بعد تحذير الشخص المخالف!!!`, components: [row] }).then(async (mmm) => {
          let collect = await mmm.awaitMessageComponent().catch(() => 0);
          if(!collect) return;
          if(collect.customId.startsWith("logline")) {
          await mmm.delete().catch(async (err) => console.log("I Can't "));
          }
        })
      })
      collect = collect.first();
      if (!collect) return;
      map.set(message.author.id, 0);
      msg.delete().catch(() => 0);
    })
  }
}
