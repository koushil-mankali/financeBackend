const User = require("../modals/user");
const KYC = require("../modals/kyc");
const { validationResult } = require('express-validator'); 

exports.createUser = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }


    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPhone = req.body.userPhone;
    const userPassword = req.body.userPassword;
    const userAddress = req.body.userAddress;
    const userReference = req.body.userReference;
    const status = req.body.status;
    const role = 'user';

    bcrypt.hash(userPassword, 12).then(hashedPassword => {
        User.find({userEmail:userEmail}).then(result => {
            if(result){
                throw new Error("User with email already exists!")
            }
            const addUser = new User({username: userName, email: email, phone: userPhone, password: hashedPassword, address: userAddress, reference: userReference, status: status, role: role});
            addUser.save().then( () => {
                res.status(201).json({message: "Succesfully Created User!"})
            })
        }).catch(err => {
            throw err;
        })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.userKYC = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }


    const userId = req.body.userId;
    const panCardNo = req.body.panNo; 
    const panCardImg = req.body.panImg; 
    const aadharNo = req.body.aadharNo; 
    const aadharImg = req.body.aadharImg; 
    const userPhoto = req.file.path; 

    User.find({userId: userId}).then(result => {
        if(!result){
            throw new Error("No User Found!");
        }

        const newKYC = new KYC({userId: userId, panCardNo: panCardNo, panCardImg: panCardImg, aadharNo: aadharNo, aadharImg: aadharImg, userPhoto: userPhoto});
        newKYC.save().then(() => {
            result.kycStatus = "done";
            result.save().then(() => {
                res.status(200).json({message: "KYC Done Succesfully!"});
            }).catch(err => {
                throw err;
            })
        }).catch(err => { throw err; })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
    

}

exports.loanDetails = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }


    const loanAmount = Number(req.body.loanAmount); 
    const interestPercent = 2; 
    const durationType = req.body.durationType; 
    const duration = Number(req.body.duration); 

    let totalAmount;

    if(durationType === "day") {
        totalAmount = (((loanAmount * interestPercent * duration) / 100) * 1/365);
    }else if (durationType === "month") {
        totalAmount = (((loanAmount  * interestPercent * duration) / 100) * duration * 30/ 365);
    }else if (durationType === "year") {
        totalAmount = (loanAmount  * interestPercent * duration) / 100;
    }

    totalAmount = totalAmount + loanAmount


    res.status(200).json({message: "Success!", data: {"Loan Amount": loanAmount, "Interest Percentage": interestPercent, "Duration Type": durationType, "Duration": duration, "Total Amount": +totalAmount.toFixed(2)}});
}