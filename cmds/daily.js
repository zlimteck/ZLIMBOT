const Discord = require("discord.js");
const talkedRecently = new Set([180]);
let coins = require("../ecoin.json");
const fs = require("fs");

module.exports.run = async (bot, message) => {
    if (talkedRecently.has(message.author.id)) {
        message.channel.send(`${message.author} merci de patienter 3 heures avant de pouvoir éxécuter de nouveau cette commande !`), message.delete().catch();
} else {
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 10800000);

    let pUser = message.author
    let pCoins = coins[pUser.id].coins;

    coins[pUser.id] = {
      coins: pCoins + parseInt(250)
    };

    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
      if(err) cosole.log(err)
    });

    // message.channel.send(`${message.author} Tu as obtenu(e) 250 ecoin !`);
    // message.channel.send(`${message.author} OK`);
    let dailyembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setThumbnail("https://imgur.com/yARdHmJ.jpg")
    .addField("Daily obtenu", `${message.author}`, true)
    .addField("Montant:", `250 Ecoin`, true) 
    .setFooter(`Offert par E Corp !`)
    .setTimestamp()
    message.channel.send(dailyembed) , message.delete().catch();
    // let embed = new Discord.RichEmbed()
    // .setAuthor(message.author.tag, message.author.displayAvatarURL)
    // .setThumbnail("https://imgur.com/yARdHmJ.jpg")
    // .addField("Daily pour:", `${pUser}`, true)
    // .addField("Montant:", `250 Ecoin`, true) 
    // .setFooter(`Offert par E Corp !`)
    // .setTimestamp()
    // pUser.send({embed: embed});
    // message.delete().catch();
  }
}

module.exports.help = {
    name:"daily"
}