const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {
    var codes = {
        "az": "Azerbaijan",
        "sq": "Albanian",
        "am": "Amharic",
        "en": "English",
        "ar": "Arabic",
        "hy": "Armenian",
        "af": "Afrikaans",
        "eu": "Basque",
        "ba": "Bashkir",
        "be": "Belarusian",
        "bn": "Bengali",
        "my": "Burmese",
        "bg": "Bulgarian",
        "bs": "Bosnian",
        "cy": "Welsh",
        "hu": "Hungarian",
        "vi": "Vietnamese",
        "ht": "Haitian (Creole)",
        "gl": "Galician",
        "nl": "Dutch",
        "mrj": "Hill Mari",
        "el": "Greek",
        "ka": "Georgian",
        "gu": "Gujarati",
        "da": "Danish",
        "he": "Hebrew",
        "yi": "Yiddish",
        "id": "Indonesian",
        "ga": "Irish",
        "it": "Italian",
        "is": "Icelandic",
        "es": "Spanish",
        "kk": "Kazakh",
        "kn": "Kannada",
        "ca": "Catalan",
        "ky": "Kyrgyz",
        "zh": "Chinese",
        "ko": "Korean",
        "xh": "Xhosa",
        "km": "Khmer",
        "lo": "Laotian",
        "la": "Latin",
        "lv": "Latvian",
        "lt": "Lithuanian",
        "lb": "Luxembourgish",
        "mg": "Malagasy",
        "ms": "Malay",
        "ml": "Malayalam",
        "mt": "Maltese",
        "mk": "Macedonian",
        "mi": "Maori",
        "mr": "Marathi",
        "mhr": "Mari",
        "mn": "Mongolian",
        "de": "German",
        "ne": "Nepali",
        "no": "Norwegian",
        "pa": "Punjabi",
        "pap": "Papiamento",
        "fa": "Persian",
        "pl": "Polish",
        "pt": "Portuguese",
        "ro": "Romanian",
        "ru": "Russian",
        "ceb": "Cebuano",
        "sr": "Serbian",
        "si": "Sinhala",
        "sk": "Slovakian",
        "sl": "Slovenian",
        "sw": "Swahili",
        "su": "Sundanese",
        "tg": "Tajik",
        "th": "Thai",
        "tl": "Tagalog",
        "ta": "Tamil",
        "tt": "Tatar",
        "te": "Telugu",
        "tr": "Turkish",
        "udm": "Udmurt",
        "uz": "Uzbek",
        "uk": "Ukranian",
        "ur": "Urdu",
        "fi": "Finnish",
        "fr": "French",
        "hi": "Hindi",
        "hr": "Croatian",
        "cs": "Czech",
        "sv": "Swedish",
        "gd": "Scottish",
        "et": "Estonian",
        "eo": "Esperanto",
        "jv": "Javanese",
        "ja": "Japanese"
    }
    const text = args[0]
    const to = args[1]
    const from = args[2]
    const { body } = await snekfetch
    .get('https://translate.yandex.net/api/v1.5/tr.json/translate')
    .query({
        key: "trnsl.1.1.20181026T101939Z.7ebcde5ab13c768f.7d416f5c75cc85fd474bb1f37175a7b545b5f315",
        text,
        lang: from ? `${from}-${to}` : to
    });
    const lang = body.lang.split('-');
    let embed = new Discord.RichEmbed()
    .setTitle(`Traduit par Yandex Translate`)
    .setThumbnail("https://i.imgur.com/6wMB8ru.png")
    .setColor("#7FC6BC")
    .addField(`De: ${codes[lang[0]]}`,text)
    .addField(`A: ${codes[lang[1]]}`,body.text[0])
    .setFooter(`Demandé par ${message.author.username}`)
    .setTimestamp()
    message.channel.send({embed: embed});
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
    
}

module.exports.help = {
    name: "trad",
}    
