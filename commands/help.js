const Discord = require("discord.js");
const { prefix } = require("../data/config.json");

module.exports.config = {
    name: "help",
    description: "Get all commands i have",
    aliases: ["?", "how"],
    usage: "<prefix>help",
    cooldown: 20000,
    module: "Utility",
};

module.exports.run = async (bot, msg, args) => {
    const fs = require("fs");
    //run
    if (msg.channel.type == "dm") return;
    let modules = {
        util: [],
        mod: [],
        fun: [],
        HIDDEN: [],
        other: [],
    };
    let allFiles = [];
    fs.readdirSync("./commands")
        .filter((f) => f.endsWith(".js"))
        .forEach((file) => {
            const fileData = require(`../commands/${file}`).config;
            if (fileData.module == "Utility") modules.util.push(fileData);
            else if (fileData.module == "Moderation") modules.mod.push(fileData);
            else if (fileData.module == "Fun") modules.fun.push(fileData);
            else if (fileData.module == "HIDDEN") modules.HIDDEN.push(fileData);
            else if (fileData.module != "HIDDEN") modules.other.push(fileData);
            allFiles.push(fileData);
        });

    if (args.length < 1) {
        let embedHelp = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setTitle("**Command Help**")
            .setAuthor(msg.author.tag)
            .setThumbnail(msg.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`use \`${prefix}help <command name>\` to see more detail`)
            .addField(`**Moderation (${modules.mod.length})**`, `\`${modules.mod.map((e) => e.name).join("` | `") || "Not Available Yet :c"}\``)
            .addField(`**Utility (${modules.util.length})**`, `\`${modules.util.map((e) => e.name).join("` | `") || "Not Available Yet :c"}\``)
            .addField(`**Fun (${modules.fun.length})**`, `\`${modules.fun.map((e) => e.name).join("` | `") || "Not Available Yet :c"}\``)
            .addField(`**Other (${modules.other.length})**`, `\`${modules.other.map((e) => e.name).join("` | `") || "Not Available Yet :c"}\``);
        return msg.channel.send(embedHelp);
    }
    args[0] = args[0].toLowerCase();

    if (!allFiles.filter((x) => x.name == args[0] || x.aliases.includes(args[0]))[0]) return msg.channel.send(`Cannot find any command named ${args[0]}`);
    if (allFiles.filter((x) => x.name == args[0] || x.aliases.includes(args[0]))) {
        let cmds = allFiles.filter((x) => x.name == args[0] || x.aliases.includes(args[0]))[0];
        let embedHelp = new Discord.MessageEmbed()
            .setTitle("**Command Help**")
            .setAuthor(msg.author.tag)
            .setColor("#00ffff")
            .setThumbnail(msg.author.avatarURL({ dynamic: true }))
            .setDescription("This is all Information about " + `**__${cmds.name}__**\n\`<>\` = **Required**\n\`()\` = **Optional**`)
            .addField("**Description**", cmds.description || "Not Set")
            .addField("**Aliases**", cmds.aliases.length ? `\`${cmds.aliases.join("`, `")}\`` : "`Not Set`")
            .addField("**Modules**", cmds.module || "`Other`")
            .addField("**Usage**", `\`${cmds.usage.replace(/<prefix>/g, prefix)}\`` || "`Not Set`")
            .addField("**Permission**", `\`${cmds.permissions || "Everyone"}\``)
            .setFooter("Don't includes <> and ()");
        return msg.channel.send(embedHelp);
    }
};
