const jws = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if(!authHeader){
        const error = new Error("Authorization Error!")
        error.statuscode = 401;
        throw error;
    } 

    const token = authHeader?.split(" ")[1];

    let decodedToken;

    if(token){
        decodedToken = jws.verify(token, "supersecretsecret")
        decodedToken.userId = decodedToken.userId
        decodedToken.userRole = decodedToken.userRole
    }else{
        req.userid= null
        let error = new Error("No Token Found!")
        error.statuscode = 401;
        throw error;
    }
    next();
}

module.exports = isAuth;