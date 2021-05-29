const fetch = require("node-fetch");

module.exports = (url, option = {}) => {
    return new Promise(async (resolve, reject) => {
        if (!url) reject(TypeError("Missing Url"));
        if (typeof url !== "string") reject(TypeError("The url must be a string"));
        if (typeof option !== "object") reject(TypeError("The option must be an object"));

        try {
            var fetchResult = await fetch(url, option);
            var fetchData = await fetchResult.json();
            return resolve(fetchData);
        } catch (err) {
            reject(err);
        }
    });
};
