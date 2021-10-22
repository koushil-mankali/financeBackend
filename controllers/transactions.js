const TRANS = require("../modals/transactions");
const LOAN = require("../modals/loan");
const { validationResult } = require('express-validator'); 

exports.previousTransactions = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    TRANS.find().then(result => {
        if(!result){
            throw new Error("No Transactions Found!");
        }

        return res.status(200).json({message: "All Transactions!", data: result})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.userPreviousTransactions = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body?.userId;
    const loanId = req.body?.loanId;

    TRANS.find({userId: userId, loanId: loanId}).then(result => {
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

exports.userPreviousLastTransaction = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body?.userId;
    const loanId = req.body?.loanId;

    TRANS.findOne({userId: userId, loanId: loanId}).sort({ createdAt: -1 }).limit(1).then(result => {
        if(!result){
            throw new Error("No Transaction Found!");
        }

        return res.status(200).json({message: "Transaction Details!", data: result});
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}
exports.newLoanPayment = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body?.userId;
    const loanId = req.body?.loanId;

    TRANS.findOne({userId: userId, loanId: loanId}).sort({ createdAt: -1 }).limit(1).then(result => {
        if(!result){
            throw new Error("No Details Found!");
        }
        let dueAmount;

        if(!result){
            dueAmount = 0;
        }

        const date1 = new Date(result.date);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        LOAN.findOne({_id: loanId, userId: userId}).then(loanData => {
            dueAmount = ( diffDays - 1 ) * loanData.dailyPayableAmount;
            const payableAmount = loanData.dailyPayableAmount;
            const loanAmount = loanData.loanAmount; 
            const durationType = loanData.durationType; 
            return res.status(200).json({message: "Loan Payment Details!", data: {dueAmount: dueAmount, payableAmount: payableAmount, loanAmount:loanAmount, durationType: durationType}});
        }).catch(err => next(err))

    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.newTransaction = (req, res, next) => {

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