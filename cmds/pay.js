const Discord = require("discord.js");
let coins = require("../ecoin.json");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
//   if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");

    if (!coins[message.author.id]){
      return message.reply("Tu n'as pas d'Ecoin dans ton portefeuille !")
    }

    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(pUser.id === message.author.id){
      return message.reply("Tu ne peux pas t'envoyé d'Ecoin. TRICHEUR !");
      }
  
    if (!coins[pUser.id]){
      coins[pUser.id] = {
        coins: 0
      };
    }

    let pCoins = coins[pUser.id].coins;
    let sCoins = coins[message.author.id].coins;
    let Ecoin = coins[message.author.id].coins;

    if (!args[1] || args[1 == "null"]) return message.reply("Aucun montant d'Ecoin rentré !");
    if (args[1].includes("-")) return message.reply(`Montant d'ecoin incorrect !`);


    if (args[1] == pUser) return message.reply("Usage: !pay @username montant");

    if (isNaN(args[1])) return message.reply('Entre un montant valide !')


    if(sCoins < args[1]) return message.reply("Tu n'as pas assez d'Ecoin pour effectuer ce virement !");

    coins[message.author.id] = {
      coins: sCoins - parseInt(args[1])
    };
  
    coins[pUser.id] = {
      coins: pCoins + parseInt(args[1])
    };

    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setThumbnail("https://imgur.com/yARdHmJ.jpg")
    .addField("Virement pour:", `${pUser}`, true)
    .addField("Montant:", `${args[1]} Ecoin`, true) 
    .setFooter(`Virement de ${message.author.username} traité par E Corp !`)
    .setTimestamp()
    message.channel.send(embed);
    pUser.send({embed: embed});
    message.delete().catch();

    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
      if(err) cosole.log(err)
    });

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Virement de ${message.author.username} pour ${pUser} d'un montant de ${args[1]} Ecoin`)

  }

module.exports.help = {
    name:"pay"
}
