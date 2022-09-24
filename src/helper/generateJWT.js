// declare library
const jwt = require('jsonwebtoken');

// untuk menampilkan otomatis di dalam destructure gunakan ctrl + spasi
const { JWT_SECRET } = require('./env');

module.exports = async (payload) => {
    const token = await jwt.sign(payload, JWT_SECRET);
    return token;
}