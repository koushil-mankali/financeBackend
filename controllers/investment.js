const INST = require("../modals/investment");
const { validationResult } = require('express-validator'); 

exports.getInvestMentData = (req, res, next) => {
    INST.find().then(result => {
        if(!result || result.length <=0){
            throw new Error("No Data Found!");
        }
        return res.status(200).json({message:"Success", data: result})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.addCapital = (req, res, next) => {
    const AddCapital = req.body.addCapital;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }


    INST.findOne().sort({ createdAt: -1 }).limit(1).then(result => {

        let previousCapitalAmount;
        let totalInvestment;
        let date;

        if(!result){
            console.log(1)
            previousCapitalAmount = AddCapital;
            totalInvestment = previousCapitalAmount;
            date = new Date();
        }else{
            console.log(2, result?.totalInvestment)
            previousCapitalAmount = result?.totalInvestment + +AddCapital;
            totalInvestment = previousCapitalAmount;
            date = new Date();
        }

        const addNewCapital = new INST({capitalAmount: previousCapitalAmount, totalInvestment: totalInvestment, date: date});
        addNewCapital.save().then( () => {
            return res.status(200).json({message: 'Success', data: {capitalAmount:previousCapitalAmount, totalInvestment: totalInvestment, date:date}})
        })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}