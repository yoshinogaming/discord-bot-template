const { prefix } = require("../data/config.json");
const intervalPerPercense = 60000; //Cooldown between any presence loop in ms.

module.exports = async (bot) => {
    //List of presence to be diplay on bot profile.
    let presences = [{ type: "LISTENING", activity: `${prefix}help` }];
    await bot.user.setActivity(presences[0].activity, { type: presences[0].type });
    var index = 1;
    if (!presences.length) return;
    if (presences.length == 1) return;
    setInterval(() => {
        if (index > presences.length - 1) index = 0;
        bot.user.setActivity(presences[index].activity, { type: presences[index].type });
        index++;
    }, intervalPerPercense);
};
