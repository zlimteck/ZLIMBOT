const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

    if(!xp[target.id]){
        xp[target.id] = {
            xp:0,
            level: 1
        };
    }

    let curxp = xp[target.id].xp;
    let curlvl = xp[target.id].level;
    let nxtLvlXp = curlvl * 500;
    let difference = nxtLvlXp - curxp;
    let xpembed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setThumbnail(target.displayAvatarURL)
    .addField("Membre", `${target}`)
    .addField('Level', curlvl, true)
    .addField('XP', curxp, true)
    .setFooter(`${target.username} Level up dans ${difference} xp!`)
    .setTimestamp()
    message.channel.send(xpembed);
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    console.log(`${target} Level: ${curlvl} XP: ${curxp} Prochain level dans ${difference} xp`)

}

module.exports.help = {
    name:"xp"
}