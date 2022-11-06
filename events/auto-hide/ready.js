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
        c.permissionOverwrites.edit(config.autohide_role, {
          VIEW_CHANNEL: false 
        }).catch(() => 0);
      });
      if(channel) {
        channel.send({ content: `تم إغلاق جميع الرومات @here . \n اللهم صل وسلم وبارك على سيدنا محمد وعلى آله عدد حروف القرآن حرفاً حرفاً،❤`, files: [config.autohide_line] });
        channel.send({ files: [config.autohide_line] });
      }
    },{
      timezone: "Egypt"
    });
    let open_time = config.open_time.split(":");
    cron.schedule(`${open_time[1]} ${open_time[0]} * * *`, async () => {
      let category = client.channels.cache.get(config.autohide_category);
      let channel = client.channels.cache.get(config.autohide_channel);
      let channels = category.guild.channels.cache.filter(c => c.parentId == category.id);
      console.log(channels.size);
      channels.forEach(c => {
        c.permissionOverwrites.edit(config.autohide_role, {
          VIEW_CHANNEL: true 
        }).catch(() => 0);
      });
      if(channel) {
        channel.send({ content: `تم فتََح جميع الرومات @here . \n اللهم صل وسلم وبارك على سيدنا محمد وعلى آله عدد حروف القرآن حرفاً حرفاً،❤`, files: [config.autohide_line]  });
        channel.send({ files: [config.autohide_line] });
      }
    },{
      timezone: "Egypt"
    });
  }
}