const jwt = require("jsonwebtoken")

const authjwtmiddleware = (req, res, next) => {
    const token = req.headers["authorization"]
    console.log(token);
    try {
        if (token) {
            const jwtToken = jwt.verify(token, "superuserToken")
            console.log(jwtToken);
            req.payload = jwtToken.id
            console.log(req.payload);
            next();
        } else {
            res.status(406).json({
                success: false,
                message: "Provide the token"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: error
        })
    }

}


module.exports = { authjwtmiddleware }