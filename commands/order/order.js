const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "طلب",
  run: async(client, message, args) => {
    if(!message.channel.name.startsWith("・〡الـطلبات")) return message.reply(`لا يمكنك الطلب هنا ، قم بالطلب في روم <#${config.order_room}>`).then(async (m) => {
      await message.react("❌").catch(err => 0)
        setTimeout(() => m.delete().catch(err => 0), 3000) 
  })
    let howmsg = new Discord.EmbedBuilder()
      .setTitle(`# Rolex Owner's .`)
      .setImage("https://cdn.discordapp.com/attachments/986263839207211028/1026819732260798585/unknown.png")
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setDescription(`** > Rolex Order's :

      طريقة الطلب : \`\`\`اكتب : #طلب ثم طلبك   \`\`\`**`)
      .setFooter({text: `Requested By : ${message.author.username} - # Rolex Owner's .`, iconURL: `https://cdn.discordapp.com/attachments/993590565767753838/1036697458060832828/rolexbot1.png`});
    const name1 = args.join(" ");
    if(!name1) return message.reply({embeds: [howmsg]}).catch(err => 0).then(async(msggggggggg) => {
      setTimeout(() => message.delete().catch(err => 0), 3000)
      setTimeout(() => msggggggggg.delete().catch(err => 0), 3000);        
    })
    let ordernew = new Discord.EmbedBuilder()
      .setTitle(`# Rolex Owner's .`)
      .setImage("https://cdn.discordapp.com/attachments/986263839207211028/1026819732260798585/unknown.png")
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setDescription(`
      > منتجات : 🛒
      نيتروهات ، حسابات الخ..

      > تصميم : 🖌️
      خط ، صورة ، لوجو الخ ..

      > الغاء الطلب : ❌`)
      .setFooter({text: `Requested By : ${message.author.username} - # Rolex Owner's .`, iconURL: `https://cdn.discordapp.com/attachments/993590565767753838/1036697458060832828/rolexbot1.png`});
    let order_but1 = new Discord.ButtonBuilder()
      .setStyle(Discord.ButtonStyle.Success)
      .setCustomId(`mntgat`)
      .setLabel("🛒 : منتجات");
    let order_but2 = new Discord.ButtonBuilder()
      .setStyle(Discord.ButtonStyle.Primary)
      .setCustomId(`tsamem`)
      .setLabel("🖌️ : تصاميم");
    let order_but3 = new Discord.ButtonBuilder()
      .setStyle(Discord.ButtonStyle.Danger)
      .setCustomId(`cansel`)
      .setLabel("❌ : الغاء");
    let row = new Discord.ActionRowBuilder()
      .addComponents(order_but1, order_but2, order_but3);
    
    let ordernew1 = new Discord.EmbedBuilder()
      .setTitle(`# Rolex Owner's .`)
      .setImage("https://cdn.discordapp.com/attachments/986263839207211028/1026819732260798585/unknown.png")
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .setDescription(`** الطلب الجديد من  :**
      ID : ${message.author.id} , <@${message.author.id}> 
      **الطلب :**
      \`\`\`${name1}\`\`\``)
      .setFooter({text: `Requested By : ${message.author.username} - # Rolex Owner's .`, iconURL: `${message.author.displayAvatarURL()}`});
    message.reply({content: `ما هو نوع طلبك؟ ,<@${message.author.id}>`, embeds: [ordernew], components: [row]}).catch(err => 0).then(async (mmbtn) => {
      let collect = await mmbtn.awaitMessageComponent({ filter: b => b.user.id == message.author.id, max: 1 }).catch(() => 0);
      if(!collect) return;
      if(collect.customId.startsWith("cansel")) {
        mmbtn.delete().catch(err => 0);
        await message.reply({ content: `${message.author}, ❌ **تم إلغاء هذا الطلب بنجاح.**`, ephemeral: true }).catch(err => 0).then(async (msg1)=> {
          setTimeout(() => message.delete().catch(err => 0), 1000)
          setTimeout(() => msg1.delete().catch(err => 0), 3000);
        })
        }
       if(collect.customId.startsWith("mntgat")) {
          mmbtn.delete().catch(err => 0);
          await message.reply({ content: `${message.author}, ✅ **تم إرسال هذا الطلب إلي البائعين بنجاح.**`, ephemeral: true }).catch(err => 0).then(async (msg2)=> {
            let channel = message.guild.channels.cache.get(config.order_room_send);
            if(!channel) return;
            channel.send({ content: `** :طلب جديد من ${message.author} - <@&${config.order_mention_role}> ** <:RolexsPin:1012969637597675600>`, embeds: [ordernew1] })
          setTimeout(() => message.delete().catch(err => 0), 1000)
          setTimeout(() => msg2.delete().catch(err => 0), 3000);           
        })
        }
       if(collect.customId.startsWith("tsamem")) {
          mmbtn.delete();
          await message.reply({ content: `${message.author}, ✅ **تم إرسال هذا الطلب إلي البائعين بنجاح.**`, ephemeral: true }).catch(err => 0).then(async (msg3)=> {
            let channel = message.guild.channels.cache.get(config.order_room_send);
            if(!channel) return;
            channel.send({ content: `** :طلب جديد من ${message.author} - <@&${config.order_mention_role}> ** <:RolexsPin:1012969637597675600>`, embeds: [ordernew1] }).catch(err => 0)
          setTimeout(() => message.delete().catch(err => 0), 1000)
          setTimeout(() => msg3.delete().catch(err => 0), 3000);
        })
       }
    })
   }
}
