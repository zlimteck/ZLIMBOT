const Discord = require("discord.js");
let coins = require("../ecoin.json");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");

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

    //if (!args[0] || !args[1] || args[0 == "null"]) return message.reply("Aucun montant d'Ecoin rentré !");
    if (!args[1] || args[1 == "null"]) return message.reply("Aucun montant d'Ecoin rentré !");
    if (args[1] == pUser) return message.reply("Usage: !pay @username montant");

    if(sCoins < args[1]) return message.reply("Tu n'as pas assez d'Ecoin pour effectuer ce virement !");

    coins[message.author.id] = {
      coins: sCoins - parseInt(args[1])
    };
  
    coins[pUser.id] = {
      coins: pCoins + parseInt(args[1])
    };

    message.channel.send(`${message.author} a envoyé a ${pUser} ${args[1]} Ecoin.`);

    fs.writeFile("./ecoin.json", JSON.stringify(coins), (err) => {
      if(err) cosole.log(err)
    });

    message.delete().catch();

  }

module.exports.help = {
    name:"pay"
}