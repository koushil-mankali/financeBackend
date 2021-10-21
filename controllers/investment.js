const INST = require("../modals/investment");

exports.getInvestMentData = (req, res) => {
    INST.find().then(result => {
        if(!result){
            throw new Error("No Data Found!");
        }
        return res.status(200).json({message:"Success", data: result})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.addCapital = (req, res) => {
    const AddCapital = req.addCapital;

    INST.findOne({}, {sort:{$natural:-1}}).then(result => {
            // Take from database
        const previousCapitalAmount = result.previousCapitalAmount;
        const totalNewCapital = previousCapitalAmount + AddCapital;
        const date = new Date();
        
        const addNewCapital = new INST({capitalAmount: previousCapitalAmount, totalInvestment: totalNewCapital, date: date});
        addNewCapital.save().then( () => {
            return res.status(200).json({message: 'Success', data: {totalNewCapital: totalNewCapital, date:date, previousCapital: previousCapitalAmount}})
        })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}