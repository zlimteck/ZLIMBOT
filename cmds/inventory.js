const Discord = require("discord.js");
let pick = require("../pickaxe.json");

module.exports.run = async (bot, message) => {

    let target = message.mentions.users.first() || message.author || message.author.id;

    if(!pick[target.id]){
        pick[target.id] = {
            pick: 0
        };
    }

    let pickaxe = pick[target.id].pick;
    let embed = new Discord.RichEmbed()
    .setTitle("**INVENTAIRE**")
    .setColor("#15f153")
    .setAuthor(target.tag, target.displayAvatarURL)
    .addField('Pioche(s):', `${pickaxe}`)
    .setFooter(`Inventaire de ${target.username} !`)
    .setTimestamp()
    message.channel.send(embed);
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`Iventaire de ${target.username}: ${pickaxe} pioche(s)`)
}

module.exports.help = {
    name:"inventory"
}