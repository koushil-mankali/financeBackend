const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator'); 
const User = require("../modals/user");
const KYC = require("../modals/kyc");

exports.getAllUsers = (req, res, next) => {
    
    User.find({ role : {$ne: "admin"} }, {userPassword: 0}).then(result => {
        if(!result){
            throw new Error("No USer Found!");
        }

        return res.status(200).json({message: "All USers Data!", data: result})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.createUser = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPhoto = req.file.path;
    const userPhone = req.body.userPhone;
    const userPassword = req.body.userPassword;
    const userAddress = req.body.userAddress;
    const userReference = req.body.userReference;
    const status = req.body.status;
    const kycStatus = "PENDING";
    const kyc = "";
    const role = 'user';

    bcrypt.hash(userPassword, 12).then(hashedPassword => {
        User.findOne({userEmail:userEmail}).then(result => {
            if(result){
                throw new Error("User with email already exists!")
            }
            const addUser = new User({userName: userName, userEmail: userEmail, userPhoto:userPhoto, userPhone: userPhone, userPassword: hashedPassword, userAddress: userAddress, userReference: userReference, kycStatus: kycStatus, kyc: kyc, status: status, role: role});
            addUser.save().then( () => {
                res.status(201).json({message: "Succesfully Created User!"})
            })
        }).catch(err => next(err))
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.userKYC = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body.userId;
    const panCardNo = req.body.panCardNo; 
    // const panCardImg = req.body.panImg; 
    const aadharNo = req.body.aadharNo; 
    // const aadharImg = req.body.aadharImg; 
    // const userPhoto = req.file.path; 

    User.findOne({_id: userId}).then(result => {
        if(!result){
            throw new Error("No User Found!");
        }

        KYC.findOneAndUpdate({userId: result._id}, {userId: userId, panCardNo: panCardNo,  aadharNo: aadharNo} ,{
            new: true,
            upsert: true
          }).then((kycData) => {
              User.findOneAndUpdate({_id: userId}, {kycStatus: "DONE", kyc: kycData._id}, {new: true}).then(() => {
                  res.status(200).json({message: "KYC Done Succesfully!"});
              }).catch(err => next(err))
        }).catch(err => { throw err; })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.removeUser = (req, res, next) => {

    const userId = req.body.userId;

    User.findByIdAndRemove({_id: userId}).then(result => {
        return res.status(200).json({message: "User Deleted Succesfully!"});
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}