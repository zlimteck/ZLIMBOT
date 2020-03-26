const Discord = require("discord.js");
let success = require("../successusers.json");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

    if(!success[message.author.id]){
        success[message.author.id] = {
          success: "Tu n'as encore obtenu aucun trophy, dommage .."
        };
    }

        let trophy = success[message.author.id].success;
        let embed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Membre", `${message.author}`)
        .addField('Trophy obtenu', trophy)
        .setTimestamp()
        message.channel.send(embed);
        message.delete().catch();
        
        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

}

module.exports.help = {
    name:"success"
}