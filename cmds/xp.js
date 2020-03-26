const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

    if(!xp[message.author.id]){
        xp[message.author.id] = {
          xp: 0,
          level: 1
       };
     }
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = curlvl * 500;
        let difference = nxtLvlXp - curxp;
        let embed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Membre", `${message.author}`)
        .addField('Level', curlvl, true)
        .addField('XP', curxp, true)
        .setFooter(`${message.author.username} il te faut encore ${difference} pour level up !`)
        .setTimestamp()
        message.channel.send(embed);
        message.delete().catch();

      console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
      console.log(`${message.author} Level: ${curlvl} XP: ${curxp} Prochain level dans ${difference} xp`)
}

module.exports.help = {
    name:"xp"
}