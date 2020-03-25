const Discord = require("discord.js");
let coins = require("../ecoin.json");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");

    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if (!args[0] || args[0 == "null"]) return message.reply("Usage: !addecoin @username montant");

    if (!coins[pUser.id]){
        coins[pUser.id] = {
          coins: 0
        };
      }

    let pCoins = coins[pUser.id].coins;

    if (!args[1] || args[1 == "null"]) return message.reply("Aucun montant d'Ecoin rentré !");

    if (args[1] == pUser) return message.reply("Usage: !addecoin @username montant");

    if (isNaN(args[1])) return message.reply('Entre un montant valide !')

    coins[pUser.id] = {
        coins: pCoins + parseInt(args[1])
      };
  
      let embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setThumbnail("https://imgur.com/yARdHmJ.jpg")
      .addField("Offre pour:", `${pUser}`, true)
      .addField("Montant:", `${args[1]} Ecoin`, true) 
      .setFooter(`Offert par E Corp !`)
      .setTimestamp()
      message.channel.send(embed);
      pUser.send({embed: embed});
      message.delete().catch();

    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
      });

      console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
      console.log(`Ajout de ${args[1]} ecoin au solde de ${pUser} effectué par ${message.author.username} le ${message.createdAt}`)

    }

    module.exports.help = {
        name:"addecoin"
    }
