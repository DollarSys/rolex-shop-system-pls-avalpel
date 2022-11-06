const db = require("../../models/scammers");
const config = require("../../config.json");

module.exports = {
  name: "حذف",
  run: async(client, message, args) => {
    if(!message.member.roles.cache.has(config.scammer_admin)) return;

    let user = args[0] ? message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => 0) : null;
    if(!user) return message.reply({ content: `❌ **Please provide a user.**` });

    let data = await db.findOne({
      id: user.id
    });
    if(!data || (!data.status && data.by == "null")) return message.reply({ content: `❌ **هذا العضو لم تتم إضافته لقائمة النصابين.**` });

    data.by = "null";
    data.name_price = "null";
    data.story = "null";
    data.photos = [];
    data.status = false;
    await data.save().catch(() => 0);
    message.reply({ content: `✅ **تم إزالة هذا العضو من قائمة النصابين.**` });
  }
}