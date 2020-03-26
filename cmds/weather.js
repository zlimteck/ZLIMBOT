const Discord = require('discord.js')
const weather = require('weather-js')

module.exports.run = (bot, message, args) => {
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
        if (err) message.channel.send(err);
        if (result === undefined || result.length === 0) {
            message.channel.send('Veuillez rentrer une localisation !')
            return;
        }

        var current = result[0].current;
        var results = result[0]
        var temps = {
            "Sunny": "Soleil",
            "Clear": "Dégagé",
			"Mostly Sunny": "Assez ensoleillé",
			"Cloudy": "Nuageux",
            "Mostly Cloudy": "Plutôt nuageux",
            "Snow": "Temps enneigé",
            "Light Rain": "Pluie légère",
            "Partly Sunny": "Partiellement ensoleillé",
            "T-Storm": "Tempêtes",
            "Partly Cloudy": "Partiellement nuageux",
            "Rain Showers": "Averses de pluie",
            "Light Snow": "Neige légère",
            "Mostly Clear": "Plutôt dégagé",
            "Rain": "Pluie",
            "Snow": "Neige"
        }

        message.delete().catch();
        const weather_embed = new Discord.RichEmbed()
        .setDescription(`**${current.observationpoint}**`) 
        .setAuthor(`Météo de :`) 
        .setThumbnail(current.imageUrl)
        .setColor("#7FC6BC") 
        .addBlankField(false)
        .addField(`Météo actuelle:`, temps[current.skytext])
        .addBlankField(false)
        .addField(':thermometer: Température',`${current.temperature} °C`, true)
		.addField(':thermometer: Température ressentie', `${current.feelslike} °C`, true)
        .addField(':dash: Vent',current.winddisplay, true)
        .addField(':droplet: Humidité', `${current.humidity}%`, true)
		.addBlankField(false)
        .addField(`Prévisions de demain:`, temps[results.forecast[1].skytextday])
        .addBlankField(false)
		.addField(':thermometer: Température max',`${results.forecast[1].high} °C`, true)
		.addField(':thermometer: Température min',`${results.forecast[1].low} °C`, true)
		.addField(':sweat_drops: Chance de précipitation',`${results.forecast[1].precip} %`, true)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp()
        message.channel.send(weather_embed);

        console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
        
    });
}

module.exports.help = {
    name: "weather"
}    