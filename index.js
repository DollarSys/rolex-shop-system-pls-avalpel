require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({ partials: [Partials.Message, Partials.Channel, Partials.User, Partials.GuildMember], intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });


require("mongoose").connect(process.env.database, { useNewUrlParser: true, useUnifiedTopology: true });

for(let handler of ["message", "event"]) require("./handlers/" + handler)(client);

process.on("unhandledRejection", (reason) => console.log(reason));

process.on("error", (err) => console.log(err));

client.login(process.env.token);

















