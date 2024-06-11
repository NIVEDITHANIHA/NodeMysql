const jwt = require("jsonwebtoken")

const authjwtmiddleware = (req, res, next) => {
    next();
}


module.exports = { authjwtmiddleware }