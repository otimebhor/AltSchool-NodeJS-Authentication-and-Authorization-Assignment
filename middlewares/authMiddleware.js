const users = require('../users/userController')
const fs = require('fs')


const apiKeyAuth = (req, res, next ) => {
    const authHeader = req.headers;

    if (!authHeader.api_key) {
        return res.status(401).json({ message: 'You are authenticated!'});

    }

    const existingUser = db.users.find(user => user.api_key === authHeader.api_key)
    if (existingUser){
        req.user = existingUser
        next()
    } else {
        return res.status(401).json({ message: 'You are not authenticated!'})
    }
};

const checkAdmin = (req, res, next) => {
    const api_key = req.headers.api_key;
    const userDb = fs.readFileSync('./users/users.json');
    const userObj = JSON.parse(userDb);

    const foundUser = userObj.find(user => user.api_key === api_key);
    if (foundUser.user_type != 'admin') {
        return res.status(401).json({ message: 'You are not authorized'})
    }

    next()
};


module.exports = { apiKeyAuth, checkAdmin };