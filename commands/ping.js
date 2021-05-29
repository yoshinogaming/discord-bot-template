const Discord = require("discord.js");

module.exports.config = {
    name: "ping",
    description: "PING",
    aliases: [],
    usage: "<prefix>ping",
    module: "Utility",
    cooldown: 2000,
};

module.exports.run = async (bot, msg, args) => {
    msg.channel.send("PING!");
};
