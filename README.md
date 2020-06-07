# ZLIMBOT

![alt text](https://i.imgur.com/GfgsBdt.jpg)

Bot Discord sous Node.js

![Discord](https://img.shields.io/discord/637958719954616320?color=%23738ADB&label=Discord&style=flat-square)

# Site web

[Site web](https://zlimbot.fr)

# Token

Crée votre bot sur cette [page](https://discordapp.com/developers/applications/) recupéré votre token et copiez le dans le fichier [botsettings.json](https://github.com/GrimZam/GRIMBOT/blob/master/botsettings.json)
Example: `"token": "TOKEN",`

# Database MySQL

Ajouté les informations de votre database dans [botsettings.json](https://github.com/GrimZam/ZLIMBOT/blob/master/botsettings.json) a la ligne 4 a 7
```
    "host": "HOST HERE",
    "user": "USER HERE",
    "password": "PASSWORD HERE",
    "database": "DATABASE NAME HERE",
```

# Creation de la Database MySQL

```
CREATE DATABASE "NOM DE VOTRE DATABASE";
USE "NOM DE VOTRE DATABASE";
CREATE TABLE xp (id VARCHAR(30) NOT NULL, xp INT NOT NULL);
CREATE TABLE ecoin (id VARCHAR(30) NOT NULL, ecoin INT NOT NULL);
CREATE TABLE messages (id VARCHAR(30) NOT NULL, messages INT NOT NULL);
```

(Attention via la DB ca stock uniquement les informations , pour le moments toutes les commandes utilisent les .json).

# Prérequis

[![Foo](https://img.shields.io/badge/Node.js-Download-3ADC1A&?style=flat-square&logo=appveyor)](https://nodejs.org/en)
[![Foo](https://img.shields.io/badge/npm-Download-E13A18&?style=flat-square&logo=appveyor)](https://www.npmjs.com/get-npm)
[![Foo](https://img.shields.io/badge/Discord.js-Download-%232196f3&?style=flat-square&logo=appveyor)](https://discord.js.org/#/)

# Installation des modules

`npm install` pour installer la totalité des modules present dans le [package.json](https://github.com/GrimZam/GRIMBOT/blob/master/package.json)

# PM2

Installer [pm2](http://pm2.keymetrics.io/) `npm install pm2 -g` et ensuite lancer le bot via `pm2 start NOMDUBOT.js`.

# nodemon

Installer [nodemon](https://nodemon.io/) `npm install -g nodemon` et ensuite lancer le bot via `nodemon NOMDUBOT.js`.

# Commande a exécuté dans discord une fois le bot fonctionnel 

```!configserver``` : Ajoute les roles et salons essentiel au fonctionnement du bot sur le serveur discord
