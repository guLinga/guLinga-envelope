const crypto = require('crypto-js')

module.exports = function (word) {
    return crypto.MD5(word).toString();
}