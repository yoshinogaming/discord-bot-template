const Discord = require("discord.js");

module.exports.config = {
    name: "support",
    description: "Support Us!",
    aliases: [],
    usage: "<prefix>support",
    module: "Utility",
    cooldown: 2000,
};

module.exports.run = async (bot, msg, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Support Us!")
    .addField(`MangAdi3859`, 'Discord : ISLA#9107\nGithub : [Click Here](https://github.com/mangadi3859/)')
    .addField(`Greblue`, 'Discord : Greblue#7665\nGithub : [Click Here](https://github.com/Greblue/)')

    msg.channel.send(embed);
};
