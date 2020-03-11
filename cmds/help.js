const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
	message.delete().catch();
    let embed = new Discord.RichEmbed()
    .setAuthor("HELP")
    .setDescription("Affiche les commandes que propose ZLIMBOT")
    .setThumbnail(bicon)
    .setColor("#1AC6E1")
    .addField("❯ :robot: Commandes Bot", "- !userinfo : Donne les infos de l'user. \n- !xp +@user = Affiche l'xp du membre demandé. \n- !zlimbot : Donne les infos de GRIMBOT. \n- !server : Donne les infos du serveur. \n- !member : Affiche le nombre de membres sur le serveur. \n- !role + ROLE : Affiche les infos sur le role demandé. \n- !avatar : Affiche l'avatar du membre. \n- !icon : Affiche l'icône du serveur. \n- !emojis : Affiche les emojis du serveur. \n- !approved @TONPSEUDO : Fait une demande pour etre membre approuvé.")
    .addField("❯ :cop: Commandes Admin/Moderation", "- !tempomute @User 1s/m/h/d : Mute le membre. \n- !unmute @User : Unmute le membre. \n- !clear +number : Delete X message. \
    \n- !say : Le bot envoi le message. \n- !sayinchan : Le bot envoie le message dans le salon indiqué. \n- !mp : Le bot envoi un DM. \n- !img +link : Le bot envoi une image. \n- !announce +message : Le bot envoi une annonce. \n- !sondage +message : Le bot envoi un sondage. \n- !kick +@User +Raison(s) : Kick le membre. \n- !ban +@User +Reasons : Ban le membre. \n- !createrole : Crée un role. \n- !addrole +@User +Role : Donne le rôle au membre(s). \
    \n- !removerole +@User +Role : retire le rôle au membre(s). \n- !addecoin : Ajoute des ecoin au membre sur la DB (Exemple : ``!addecoin @Username 100``).")
    .addField("❯ :gear: Utile", "- !report @User +Raison(s) : Report le membre. \n- !mpstaff + message : Envoie un MP au staff \n- !quote messageid channelid : Le bot quote le message. \n- !hastebin + message : Publie sur Hastebin et envoie l'url. \n- !ping : Tu obtiens ton ping. \n- !speedtest : Effectue un speedtest. \n- !afk +time/s/m/h/d : Le bot avertie que tu es AFK. \n- !rappel +time/s/m/h/d + motif : Lance un rappel. \n- !weather +localisation : Affiche la météo. \n- !spotify : Affiche les infos du morceau jouer sur Spotify. \n- !itunes : Effectue une recherche d'un album. \n- !trad +mot +Lang (ex: fr/en) : Traduit le mot donné. \n- !hltb : Affiche le lien vers le site. \n- !instagram + link post : Affiche le post instagram.")
    .addField("❯ :musical_note: Music Youtube", "- !youtube +Titre : Le bot va chercher la video sur youtube \n- !yt +link youtube : Le bot va jouer la music dans le channel vocal ou la command a etait executée. \n- !stop : Le bot se deconnecte du channel vocal et coupe la music. ")
    .addField("❯ :radio: Radio", "- !radiolist : Affiche la liste des radios disponible et la commande pour les lancer. \n- !stop :  Le bot se deconnecte du channel vocal et coupe la radio.")
    .addField("❯ :tada: Fun", "- !chuck : Quote sur Chuck Norris. \n- !trump : Quote sur Donald Trump. \n- !meme : Le bot envoie un meme. \n- !metamorphe : Le bot va te métamorphosé.")
    .addField("❯ :slot_machine: Casino", "- !roulette <noir, rouge, bleu> <amount> : Le bot lance la roulette. \n- !slots <amount> : Le bot lance la machine a sous. \n- !giveaway : Le bot lance un giveaway (Exemple : ``!giveaway <nombre de winners> <temps s/m/h/d> <price>``. \n- !lotery : Le bot lance une lotery (Exemple : ``!lotery <nombre de winners> <temps s/m/h/d> <montant ecoin>``.")
    .addField("❯ :underage: Nsfw", "- !boobs : Le bot envoie une photo random de boobs. \n- !pussy : Le bot envoie une photo random d'une pussy. \n- !gonewild : Le bot envoie une photo random de gonewild. \n- !hentai : Le bot envoie une photo random hentai. \n- !porngif : Le bot envoie un porngif random. \n- !ass : Le bot envoie une photo random d'un cul. \n- !hot : Le bot envoie une photo random hot. \n- !young : Le bot envoie une photo random d'une jeune. \n- !asiat : Le bot envoie une photo random d'une asiat. \n- !milf : Le bot envoie une photo random d'une milf. \n- !old : Le bot envoie une photo random d'une vieille. \n- !ginger : Le bot envoie une photo random d'une ginger.")
    .addField("❯ :credit_card: Ecoin", "- !ecoin : Affiche ton solde d'Ecoin disponible. \n- !pay : vire le montant d'Ecoin au membre identifié (Exemple : ``!pay @username 100``).")
    .setFooter(`Demandé par ${message.author.username}`)
	.setTimestamp()
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help"
}