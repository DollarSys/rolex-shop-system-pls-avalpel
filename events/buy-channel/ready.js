const db = require("../../models/temp-channels");
const config = require("../../config.json");

module.exports = {
  name: "ready",
  run: (client) => {
    setTimeout(async () => {
      let datas = await db.find();
      if(!datas || !datas.length) return;
      datas.filter(d => d.end_time > 0).forEach(data => {
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
          member.roles.remove(config.seller_role).catch(() => 0);
        }, data.end_time - Date.now());
      });
    }, 30000);
  }
}