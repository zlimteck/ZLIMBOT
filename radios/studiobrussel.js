const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
        .then(connection => {
            let embed = new Discord.RichEmbed()
            .setTitle("Studio Brussel")
            .setDescription("**Connected**")
            .setColor('#606060')
			.setURL("https://stubru.be/live")
			.setImage("https://imgur.com/2rfDwuo.jpg")
			.setTimestamp()
            connection.playArbitraryInput(`http://icecast.vrtcdn.be/stubru-high.mp3`);
			message.channel.send(embed);
			message.delete().catch();
        })
        .catch(console.log);
    } else {
        message.reply('Tu dois etre dans un channel vocal !');
    }
};

module.exports.help = {
    name: "studiobrussel"
}    