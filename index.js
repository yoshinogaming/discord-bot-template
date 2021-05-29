//Lib
const Discord = require("discord.js");
const fs = require("fs");
const humanizeTime = require("humanize-duration");

//Global Variables
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const { prefix, token } = require("./data/config.json");
const { discordPresence } = require("./Events");

//Command Loader
fs.readdir("./commands", (err, files) => {
    if (err) throw new Error(err); //crash if there is an error while reading the directory
    files.forEach((file) => {
        if (!file.endsWith(".js")) return; //ignore any file without .js extension.
        let fileObj = require("./commands/" + file);
        let fileConfig = fileObj.config;
        let fileAliases = fileConfig.aliases;
        bot.commands.set(fileConfig.name, fileObj);
        //check if a file has aliases.
        if (fileAliases.length) {
            fileAliases.forEach((alias) => bot.aliases.set(alias, fileObj));
        }
        console.log(file + " has been loaded.");
    });
});

//Util
bot.once("ready", () => {
    discordPresence(bot); //Change any value in 'Events/discordPresence.js'
    console.log(`Bot is online on name: ${bot.user.tag}`);
});

//Command Handler
bot.on("message", async (message) => {
    const msg = message.content.trim().split(/ +/g);
    const cmd = msg[0].slice(prefix.length).trim().toLowerCase();
    const arg = msg.slice(1);
    const cmdFile = bot.commands.get(cmd) || bot.aliases.get(cmd);
    const { cooldown, getCooldown } = require("./Function").cooldown;

    if (message.author.bot) return;
    if (!message.guild.id) return;
    if (!message.content.startsWith(prefix)) return;
    let cooldownLong = cmdFile ? cmdFile.config.cooldown || 0 : 0;
    let cd = getCooldown(message.author.id + "_" + (!cmdFile ? null : cmdFile.config.name));
    if (cd) {
        let remaining = humanizeTime(cd - Date.now());
        return message.channel.send(`You will have to wait another **${remaining}** to use this command again`);
    } else if (cmdFile) {
        cmdFile.run(bot, message, arg).catch((err) => {
            console.log(err);
            return message.channel.send(err.toString());
        });
        cooldown(message.author.id + "_" + cmdFile.config.name, Date.now() + cooldownLong, cooldownLong);
    }
});

bot.login(token);
