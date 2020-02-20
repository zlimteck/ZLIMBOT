const Discord = require("discord.js");
let coins = require("../ecoin.json");
let fs = require('fs');

module.exports.run = async (bot, message, args) => {

if(!coins[message.author.id]){
  coins[message.author.id] = {
    money: 0
  };
} 

let slots = [":apple:", ":green_apple:", ":cherries:", ":strawberry:", ":lemon:"];
let result1 = Math.floor((Math.random() * slots.length));
let result2 = Math.floor((Math.random() * slots.length));
let result3 = Math.floor((Math.random() * slots.length));
let bicon = message.author.displayAvatarURL;
let money = (args[0]);

if (!money) return message.channel.send(`Usage: \!slots <amount>`)
  if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Merci d'entré un montant valide !`);
  if (coins[message.author.id].coins < money) return message.channel.send(`**${message.author.username}**, Tu ne peux pas jouer ce montant, tu n'as pas ce montant d'Ecoin!`);
  if (money > 1000) money = 1000;

   if (slots[result1] === slots[result2] && slots[result3]) {
    money = money * 5
    let curBal1 = coins[message.author.id].coins;
    coins[message.author.id].coins = curBal1 + money;
    fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
      if(err) console.log(err);
    });
    let embed = new Discord.RichEmbed()
    .setTitle(':slot_machine: Machine a Sous :slot_machine:')
    .setColor("#F7BA2A")
    .setDescription('SLOTS: :apple: | :green_apple: | :cherries: | :strawberry: | :lemon: \n Il faut au minimum 2 items identique pour gagner la partie !')
    .addField('Resultat:', slots[result1] + slots[result2] + slots[result3], false)
    .addField("Tu as misé:", `${args[0]} Ecoin`, true )
    .addField("Tu remportes:", `${money} Ecoin`, true)
    .setFooter(`${message.author.username} Tu as gagné !`, bicon);
    message.channel.send(embed);
    message.delete().catch();    
  } else {
    money = money 
    let curBal2 = coins[message.author.id].coins;
    coins[message.author.id].coins = curBal2 - money;
    fs.writeFile('./ecoin.json', JSON.stringify(coins, null, 2), (err) => {
      if(err) console.log(err);
    });
    let embed = new Discord.RichEmbed()
    .setTitle(':slot_machine: Machine a Sous :slot_machine:')
    .setColor("#ff0000")
    .setDescription('SLOTS: :apple: | :green_apple: | :cherries: | :strawberry: | :lemon: \n Il faut au minimum 2 items identique pour gagner la partie !')
    .addField('Resultat', slots[result1] + slots[result2] + slots[result3], false)
    .addField("Tu as misé:", `${args[0]} Ecoin`, true)
    .addField("Tu perd:", `${money} Ecoin`, true)
    .setFooter(`${message.author.username} Tu as perdu!`, bicon);
    message.channel.send(embed);
    message.delete().catch();
  }
}

module.exports.help = {
  name:"slots"
}