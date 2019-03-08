const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exÃ©cuter cette commande!");
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
        .then(connection => {
            let embed = new Discord.RichEmbed()
            .setTitle("Fun Radio France")
            .setDescription("**Connected**")
            .setColor('#606060')
			.setURL("https://www.funradio.fr/")
			.setImage("https://i.imgur.com/w9ACgMv.png")
			.setTimestamp()
            connection.playArbitraryInput(`http://icecast.rtl.fr/fun-idf-48-72.aac`);
			message.channel.send(embed);
			message.delete().catch();
        })
        .catch(console.log);
    } else {
        message.reply('Tu dois etre dans un channel vocal !');
    }
};

module.exports.help = {
    name: "funradio"
}    