const TRANS = require("../modals/transactions");
const { validationResult } = require('express-validator'); 

exports.previousTransactions = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body?.userId;

    //Take from database

    if(userId){
        TRANS.find({userId: userId}).then(result => {
            if(!result){
                throw new Error("No Transactions Found!");
            }

            return res.status(200).json({message: "Transaction Details!", data: result});
        }).catch(err => {
            let error = new Error(err);
            error.statuscode = 401
            next(error)
        })
    }

    TRANS.find().then(result => {
        if(!result){
            throw new Error("No Transactions Found!");
        }

        return res.status(200).json({message: "All Transactions!", data: result})
    })
}

exports.newTransaction = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }


    const userId = req.body.userId;
    const loanId = req.body.loanId;
    const date = new Date();
    const payedAmount = req.body.payedAmount;

    TRANS.findOne({loanID: loanId, userId: userId}, {sort:{$natural:-1}}).then(result => {
        if(!result){
            throw new Error("No Loan Found!");
        }        

        const date1 = new Date(result.date);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        const actualDayOfPay = new Date(result.date).getDate() + 1;
        const payableAmount = result.payableAmount;
        const dueAmount = diffDays - 1 * LOAN.dailyPayableAmount;

        const newTrans = new TRANS({userId: userId, loanId: loanId, loanStartDate: result.loanStartDate, loanEndDate: result.loanEndDate, actualDayOfPay: actualDayOfPay, dateOfPaytment: date, payableAmount: payableAmount, payedAmount:payedAmount,dueAmount:dueAmount })
        newTrans.save().then( () => {
            return res.status(200).json({message: "Transaction Succesfull!"})
        }).catch(err => { throw err })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}