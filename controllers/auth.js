const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');   
const { validationResult } = require('express-validator'); 

const User = require("../modals/user");

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
      }

    User.findOne({email: email}).then(user => {
        if(!user){
            throw "No User Found!"
        }
        return user;
    }).then( user => {
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch){
                return res.status(401).json({message: "Failed Authentication"})
            }
            let token = jwt.sign({email: email, userid: user._id.toString(), userRole: user.role}, "supersecretsecret", {expiresIn : "1h"})
            return res.status(200).json({message: "Success!", token:token, email: email, userRole: user.role})
        }).catch(err => { throw err})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.signup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
      }

    User.findOne({email: email}).then(user => {
        if(user){
            throw "User already exists!";
        }

        bcrypt.hash(password, 12).then(hashedPassword => {
            const createUser = new User({username: username, email:email, password: hashedPassword});
            createUser.save().then(result => {
                return res.status(200).json({message: "Signup Success!", email: email, password: hashedPassword, username: username})
            })
        }).catch(err => {throw err} )

    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}