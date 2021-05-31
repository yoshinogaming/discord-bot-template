const Discord = require("discord.js");

module.exports.config = {
    name: "ban",
    aliases: [],
    description: "Ban someone from your server",
    usage: "<prefix>ban <@mention | id> (Reason)",
    module: "Moderation",
    cooldown: 10000,
    permissions: "BAN_MEMBERS",
};

module.exports.run = (bot, msg, args) => {
    let member = msg.member;
    let author = msg.author;
    let reason = args.slice(1).join(" ");
    if (!member.hasPermission("BAN_MEMBERS")) return msg.channel.send("You don't have permission to use this command");
    if (args.length < 1) return msg.channel.send("You'll have to mention someone");
    let target = msg.mentions.members.first() || msg.guild.members.cache.find((f) => f.id == args[0]);
    let targetId = msg.mentions.users.first() || bot.users.cache.find((f) => f.id == args[0]);
    if (!target) return msg.channel.send("I can't not find that person in this server");
    if (targetId.id == author.id) return msg.channel.send("You can't ban yourself");
    if (target.roles.highest.position > member.roles.highest.position) return msg.channel.send("You can't ban someone that has higher role than you");
    let embed = new Discord.MessageEmbed()
        .setAuthor(targetId.tag)
        .setThumbnail(targetId.avatarURL())
        .setTimestamp()
        .setFooter(`Executed by ${author.tag}`)
        .setColor("ORANGE")
        .setTitle("**Ban**")
        .setDescription("Someone has been Banned from this server")
        .addField("**Moderator**", `${member} | ${author.id}`, true)
        .addField("**Banned User**", `${target} | ${targetId.id}`, true)
        .addField("**Reason**", reason || "`Not Specified`", true);
    target
        .ban()
        .then(() => msg.channel.send(embed))
        .catch((e) => msg.channel.send("I don't have permission to do that"));
};
