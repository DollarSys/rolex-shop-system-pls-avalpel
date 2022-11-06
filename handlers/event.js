const fs = require("fs");

module.exports = (client) => {
  fs.readdirSync('./events').forEach(folder => {
    let files = fs.readdirSync(`./events/${folder}`).filter(f => f.endsWith('.js'));
    files.forEach(file => {
      let data = require(`../events/${folder}/${file}`);
      client.on(data.name, (...args) => data.run(client, ...args));
    });
  });
}