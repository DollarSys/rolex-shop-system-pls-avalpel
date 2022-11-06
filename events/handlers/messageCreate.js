const { prefix } = require("../../config.json");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if(message.author.bot) return;
    let args = message.content.split(" ");
    if(!args[0]?.startsWith(prefix)) return;
    let command = args[0].slice(prefix.length);
    if(!command || !command.length) return;
    let find = client.commands.find(cmd => cmd.name == command.toLowerCase());
    if(!find) return;
    if(!message.guild) return message.reply({ content: `❌ You can't use my commands in dm.` });
    try {
      await find.run(client, message, args.slice(1));
    } catch(err) {
      console.log(err);
      message.reply({ content: `An error happened when run this command.` });
    }
  }
}