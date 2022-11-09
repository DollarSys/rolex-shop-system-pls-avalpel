const cron = require("node-cron");
const config = require("../../config.json");

module.exports = {
  name: "ready",
  run: async (client) => {
    let close_time = config.close_time.split(":");
    cron.schedule(`${close_time[1]} ${close_time[0]} * * *`, async () => {
      let category = client.channels.cache.get(config.autohide_category);
      let channel = client.channels.cache.get(config.autohide_channel);
      let channels = category.guild.channels.cache.filter(c => c.parentId == category.id);
      channels.forEach(c => {
      c.bulkDelete(100);
      c.bulkDelete(100);
        c.permissionOverwrites.edit(config.autohide_role, {
          ViewChannel: false 
        }).catch(err => console.log(err));
      });
      if(channel) {
        channel.send({ content: `تم إغلاق جميع الرومات @here . \n اللهم صل وسلم وبارك على سيدنا محمد وعلى آله عدد حروف القرآن حرفاً حرفاً،❤` });
        channel.send({ files: `https://cdn.discordapp.com/attachments/999793644640935976/1039791816322580510/unknown.png` });
      }
    },{
      timezone: "Egypt"
    });
    let open_time = config.open_time.split(":");
    cron.schedule(`${open_time[1]} ${open_time[0]} * * *`, async () => {
      let category = client.channels.cache.get(config.autohide_category);
      let channel = client.channels.cache.get(config.autohide_channel);
      let channels = category.guild.channels.cache.filter(c => c.parentId == category.id);
      channels.forEach(c => {
      c.bulkDelete(100);
      c.bulkDelete(100);
        c.permissionOverwrites.edit(config.autohide_role, {
          ViewChannel: true 
        }).catch(err => console.log(err));
      });
      if(channel) {
        channel.send({ content: `تم فتََح جميع الرومات @here . \n اللهم صل وسلم وبارك على سيدنا محمد وعلى آله عدد حروف القرآن حرفاً حرفاً،❤` });
        channel.send({ files: `https://cdn.discordapp.com/attachments/999793644640935976/1039791816322580510/unknown.png` });
      }
    },{
      timezone: "Egypt"
    });
  }
}
