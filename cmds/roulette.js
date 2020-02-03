const Discord = require("discord.js");
let coins = require("../ecoin.json");
let fs = require('fs');

function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}

module.exports.run = async (bot, message, args) => {

    let colour = args[0];
    let money = args[1];

    if (!money) return message.channel.send(`Usage: \`!roulette <noir, rouge, bleu> <amount>\`\nMontant max jouable : **1000 Ecoin**\nChoisissez n'importe laquelle des couleurs que vous voulez ... mais certaines sont plus susceptibles que d'autres ...\n**Le noir est pour les nombres pairs**... **et rouge est pour impair**... ces deux éléments vous fourniront **2x votre montant initial**.\nPrenez un risque et choisissez **Bleu** et vous obtiendrez **20x le montant d'argent** ... mais c'est 1 chance sur 37. `);
    if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Merci d'entré un montant valide !`);
    if (money > 1000) money = 1000;
    if (coins[message.author.id].coins < money) return message.channel.send(`**${message.author.username}**, Tu ne peux pas jouer ce montant, tu n'as pas ce montant d'Ecoin!`);
    if (!colour)  return message.channel.send(`**${message.author.username}**, Vous ne pouvez parier que sur Noir (2x), Rouge (2x) ou Vert (20x).`);
    colour = colour.toLowerCase()
    
    if (colour == "n" || colour.includes("noir")) colour = 0;
    else if (colour == "r" || colour.includes("rouge")) colour = 1;
    else if (colour == "b" || colour.includes("bleu")) colour = 2;
    else return message.channel.send(`**${message.author.username}**, Vous ne pouvez parier que sur Noir (2x), Rouge (2x) ou Bleu (20x).`);
    
    let random = Math.floor(Math.random() * 37);
    
    if (random == 0 && colour == 2) {
        money *= 20
      let curBal1 = coins[message.author.id].coins
      coins[message.author.id].coins = curBal1 + money;
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
          let embed = new Discord.RichEmbed()
          .setColor("#0023FF")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTitle("**🎉 Winner JACKPOT 🎉**")
          .addField("Couleur misé:", args[0], true)
          .addField("Numéro:", random, true)
          .addField("Tu remportes:", `${money} Ecoin`)
          .setTimestamp()
          message.channel.send(embed);
          message.delete().catch();
          if(err) console.log(err)
        });
    } else if (isOdd(random) && colour == 1) {
        money = money * 2
      let curBal2 = coins[message.author.id].coins
      coins[message.author.id].coins = curBal2 + money
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
          let embed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTitle("**🎉 Winner 🎉**")
          .addField("Couleur misé:", args[0], true)
          .addField("Numéro:", random, true)
          .addField("Tu remportes:", `${money} Ecoin`)
          .setTimestamp()
          message.channel.send(embed);
          message.delete().catch();
          if(err) console.log(err)
        });
    } else if (!isOdd(random) && colour == 0) {
        money = money * 2
      let curBal3 = coins[message.author.id].coins
      coins[message.author.id].coins = curBal3 + money
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
          let embed = new Discord.RichEmbed()
          .setColor("#000000")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTitle("**🎉 Winner 🎉**")
          .addField("Couleur misé:", args[0], true)
          .addField("Numéro:", random, true)
          .addField("Tu remportes:", `${money} Ecoin`)
          .setTimestamp()
          message.channel.send(embed);
          message.delete().catch();
          if(err) console.log(err) ;
        });
    } else {
      let curBal4 = coins[message.author.id].coins
      coins[message.author.id].coins = curBal4 - money;
        fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
          let embed = new Discord.RichEmbed()
          .setColor("#76685E")
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setTitle("**🎉 Lost 🎉**")
          .addField("Couleur misé:", args[0], true)
          .addField("Numéro:", random, true)
          .addField("Tu perds:", `${money} Ecoin`)
          .setTimestamp()
          message.channel.send(embed);
          message.delete().catch();
          if(err) console.log(err)
        });
    }
}
    module.exports.help = {
      name:"roulette"
  }
