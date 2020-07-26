const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	const originalMessage = message;
	const channel = message.guild.channels.get(args[1]);
	if (args[0] === undefined) {
		originalMessage.channel.send("Usage : !quote <messageid> <channelid>");
	}
	if (args[1] !== undefined) {
		channel.fetchMessage(args[0])
		.then(message => {
			const Attachment = (message.attachments).array();
			let embed = new Discord.RichEmbed()
			.setTitle(`Quote depuis le salon #${message.channel.name} :`)
			.setColor(0x00AE86)
			.setDescription(`${message.content} 
			[Aller vers le message](https://discord.com/channels/${channel.guild.id}/${args[1]}/${args[0]})`)
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTimestamp(new Date(message.createdTimestamp).toISOString())
			if (Attachment[0] !== undefined) { embed.setImage(Attachment[0].url); }
			if(channel.nsfw === true){
				if (originalMessage.channel.nsfw === true){originalMessage.channel.send({ embed }); message.delete().catch();}
				else { originalMessage.channel.send("Vous ne pouvez pas citer un salon NSFW dans un salon SFW!")}
			} else {originalMessage.channel.send({ embed });}
		})
		message.delete().catch();

		console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)

		}
	}

module.exports.help = {
	name: "quote"
}