const Discord = require("discord.js");
let coins = require("../ecoin.json");
let fs = require('fs');

function isOdd(num) { 
	if ((num % 3) == 0) return false;
	else if ((num % 3) == 1) return true;
}

module.exports.run = async (bot, message, args) => {
    let flip = args[0];
    let money = args[1];
    let bicon = message.author.displayAvatarURL;

    if (!money) return message.channel.send("**Usage:** ``!coinflip FLIP MONTANT`` \nFLIP = Pile | Face \nMONTANT = MISE ECOIN \nMise max jouable : **50 Ecoin**");
    if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Merci d'entré un montant valide !`);
    if (money > 50) money = 50;
    if (coins[message.author.id].coins < money) return message.channel.send(`**${message.author.username}**, Tu ne peux pas jouer ce montant, tu n'as pas ce montant d'Ecoin!`);
    if (!flip)  return message.channel.send(`**${message.author.username}**, Pile ou Face.`);
    flip = flip.toLowerCase()

    if (flip == "pile" || flip.includes("pile")) flip = 0;
    else if (flip == "face" || flip.includes("face")) flip = 1;
    else return message.channel.send(`**${message.author.username}**, Pile ou Face.`);

    let random = Math.floor(Math.random() * 3);

    if (random == 0 && flip == 0) {
        money *= 2
      let curBal1 = coins[message.author.id].coins
      coins[message.author.id].coins = curBal1 + money;
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
          let embed = new Discord.RichEmbed()
          .setColor("#E6DB2B")
          .setTitle("**🌕 Pile ou Face 🌕**")
          .addField("Misé:", args[0], true)
          .addField("Ecoin misé:", `${args[1]} Ecoin`, true)
          .addField("Tu remportes:", `${money} Ecoin`, true)
          .setImage("https://i.imgur.com/0yPKepJ.png")
          .setFooter(`${message.author.username} Tu as gagné !`, bicon);
          message.channel.send(embed);
          message.delete().catch();
          if(err) console.log(err)
          console.log(`${message.author.username} gagne ${money} ecoin en ayant misé ${args[0]} a Pile ou Face`)
        });
    } else if (isOdd(random) && flip == 1) {
        money = money * 2
      let curBal2 = coins[message.author.id].coins
      coins[message.author.id].coins = curBal2 + money
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
          let embed = new Discord.RichEmbed()
          .setColor("#343322")
          .setTitle("**🌑 Pile ou Face 🌑**")
          .addField("Misé:", args[0], true)
          .addField("Ecoin misé:", `${args[1]} Ecoin`, true)
          .addField("Tu remportes:", `${money} Ecoin`, true)
          .setImage("https://i.imgur.com/0yPKepJ.png")
          .setFooter(`${message.author.username} Tu as gagné !`, bicon);
          message.channel.send(embed);
          message.delete().catch();
          if(err) console.log(err)
          console.log(`${message.author.username} gagne ${money} ecoin en ayant misé ${args[0]} a Pile ou Face`)
        });
    } else {
        let curBal3 = coins[message.author.id].coins
        coins[message.author.id].coins = curBal3 - money;
          fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
            let embed = new Discord.RichEmbed()
            .setColor("#FF3501")
            .setTitle("**🌕 Pile ou Face 🌑**")
            .addField("Misé:", args[0], true)
            .addField("Ecoin misé:", `${args[1]} Ecoin`, true)
            .addField("Tu perds:", `${money} Ecoin`, true)
            .setImage("https://i.imgur.com/VvKueSu.png")
            .setFooter(`${message.author.username} Tu as perdu!`, bicon);
            message.channel.send(embed);
            message.delete().catch();
            if(err) console.log(err)
            console.log(`${message.author.username} perd ${money} ecoin en ayant misé ${args[0]} a Pile ou Face`)
          });
      }

      console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}
    module.exports.help = {
      name:"coinflip"
  }