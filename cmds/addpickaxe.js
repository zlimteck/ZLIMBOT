const Discord = require("discord.js");
let pick = require("../pickaxe.json");
const fs = require("fs");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");

    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if (!args[0] || args[0 == "null"]) return message.reply("Usage: !addpickaxe @username montant");

    if (!pick[pUser.id]){
        pick[pUser.id] = {
          pick: 0
        };
      }

    let pPick = pick[pUser.id].pick;

    if (!args[1] || args[1 == "null"]) return message.reply("Aucun montant de pickaxe rentré !");

    if (args[1] == pUser) return message.reply("Usage: !addpickaxe @username montant");

    if (isNaN(args[1])) return message.reply('Entre un montant valide !')

    pick[pUser.id] = {
        pick: pPick + parseInt(args[1])
      };
  
      let embed = new Discord.RichEmbed()
      .setThumbnail("https://imgur.com/QpRrob2.jpg")
      .addField("Pickaxe pour:", `${pUser}`, true)
      .addField("Montant:", `${args[1]} Pickaxe(s)`, true)
      .addField("Ton solde:", `${pPick} Pickaxe(s)`)
      .setFooter(`Offert par Blanche neige!`)
      .setTimestamp()
      message.channel.send(embed);
      pUser.send({embed: embed});
      message.delete().catch();

    fs.writeFile("./pickaxe.json", JSON.stringify(pick), (err) => {
        if(err) cosole.log(err)
      });

      console.log(`Commande ${message.author.lastMessage} execute sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
      console.log(`Ajout de ${args[1]} pickaxe(s) au solde de ${pUser} effectue par ${message.author.username} le ${message.createdAt}`)
    }

    module.exports.help = {
        name:"addpickaxe"
    }