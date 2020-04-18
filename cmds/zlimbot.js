const Discord = require("discord.js");
const pkg = require("../package.json");
const {version} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message) => {
    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    let platform;
    let build;

    if (process.platform === "Win") {
        platform = "Windows";
        build = "Development";
    } else if (process.platform === "Linux") {
        platform = process.platform;
        build = "Production";
    } else {
        platform = process.platform;
        build = "Inconnu"
    }

    let Avatarbot = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setTitle(bot.user.username)
    //.setAuthor(bot.user.username)
    .setThumbnail(Avatarbot)
    .setColor("#15f153")
    .setDescription("!help pour affiché les commandes")
    .addField("❯ ZLIMBOT", `v${pkg.version}`)
    .addField("❯ Site web", "[Zlimbot](https://zlimteck.fr/zlimbot)")
    .addField("❯ Discord.js", `v${version}`)
    .addField("❯ Node.js", `${process.version}`)
    .addField("❯ Platform", `${platform}`)
    .addField("❯ RAM Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
    .addField("❯ Uptime", `${duration}`)
    .addField("❯ Serveurs", `${bot.guilds.size.toLocaleString()}`)
    .addField("❯ Crée le", bot.user.createdAt)
    .setURL("https://github.com/GrimZam/ZLIMBOT")
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send(embed);
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
    }

module.exports.help = {
    name: "zlimbot"
}
