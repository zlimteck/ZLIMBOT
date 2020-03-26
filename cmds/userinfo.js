const Discord = require("discord.js");
const moment = require("moment")
let success = require("../successusers.json");
let xp = require("../xp.json");
const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports.run = async (bot, message, args, con) => {
    let target = message.mentions.users.first() || message.author || message.author.id;
    let guild = message.channel.guild;
    let role = guild.roles.find(role => role.name)

    if(!xp[target.id]){
        xp[target.id] = {
          xp: 0,
          level: 1
       };
     }

    if(!success[target.id]){
        success[target.id] = {
          success: "Tu n'as encore obtenu aucun trophy, dommage .."
        };
    }

    let trophy = success[target.id].success;
    let curxp = xp[target.id].xp;
    let curlvl = xp[target.id].level;
    let embed = new Discord.RichEmbed()
    .setAuthor("Infos User")
    .setThumbnail(target.displayAvatarURL)
    .setColor("#15f153")
    .addField("❯ Pseudo", `${target}`, true)
    .addField("❯ Discriminator", `#${target.discriminator}`, true)
    .addField("❯ ID", target.id)
    .addField("❯ Role(s)", `${message.guild.member(target).roles.map(roles => `\`${roles.name}\``).slice(0).join(", ")}`)
    .addField('❯ Trophy obtenu', trophy)
    .addField('❯ Level', curlvl, true)
    .addField('❯ Xp', curxp, true)
    .addField("❯ Status", `${status[target.presence.status]}`, true)
    .addField("❯ Joue a", target.presence.game, true)
    .addField("❯ Dernier Message", target.lastMessage)
    .addField("❯ Compte crée", target.createdAt)
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "userinfo"
}