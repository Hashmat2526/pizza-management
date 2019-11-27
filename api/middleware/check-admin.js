const jwt = require('jsonwebtoken');
const User = require('../models/userM');
module.exports = (req, res, next) => {
    try {

        console.log(req.headers.authorization);
        console.log(req.body)
        const token = req.headers.authorization.split(" ")[1]; //fetch 1st prt of token n send through headers
        // const decoded = jwt.verify(req.body.token, process.env.JWT_KEY); other way to send token in form data
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Auth Failed ss"
        })
    }
}ddd