const fs = require("fs");

module.exports = (client, message) => {
  client.commands = [];
  fs.readdirSync('./commands').forEach(folder => {
    let files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'));
    files.forEach(file => {
      let data = require(`../commands/${folder}/${file}`);
      if(!data || !data.name) return;
      client.commands.push(data);
    });
  });
}

