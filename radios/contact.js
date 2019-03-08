const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exÃ©cuter cette commande!");
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
        .then(connection => {
            let embed = new Discord.RichEmbed()
            .setTitle("Contact")
            .setDescription("**Connected**")
            .setColor('#606060')
			.setURL("http://www.mycontact.fr/")
			.setImage("https://i.imgur.com/3yLtz7v.png")
			.setTimestamp()
            connection.playArbitraryInput(`http://radio-contact.ice.infomaniak.ch/radio-contact-high`);
			message.channel.send(embed);
			message.delete().catch();
        })
        .catch(console.log);
    } else {
        message.reply('Tu dois etre dans un channel vocal !');
    }
};

module.exports.help = {
    name: "contact"
}    