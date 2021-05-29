const cooldownData = new Map();

/**Create a cooldown
 *
 * @param {String} key
 * @param {*} value
 * @param {Number} timeout
 */
module.exports.cooldown = (key, value, timeout) => {
    cooldownData.set(key, value);
    setTimeout(() => cooldownData.delete(key), timeout);
};

/**
 *
 * @param {String} key
 * @returns cooldownValue
 */
module.exports.getCooldown = (key) => {
    return cooldownData.get(key);
};
