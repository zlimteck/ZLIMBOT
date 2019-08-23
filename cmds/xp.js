const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
        if (err) throw err;

        if(!rows[0]) return message.channel.send("Ce membre n'a pas d'xp !")
        let xp = rows[0].xp;
        let embed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setThumbnail(target.displayAvatarURL)
        .addField("Membre", `${target}`, true)
        .addField('XP', xp)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp()
        message.channel.send(embed);
        message.delete().catch();
    });
}

module.exports.help = {
    name:"xp"
}