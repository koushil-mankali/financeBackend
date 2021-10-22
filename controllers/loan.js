const LOAN = require("../modals/loan");
const TRANS = require("../modals/transactions");
const User = require("../modals/user");
const { validationResult } = require('express-validator'); 

exports.calculateLoanDetails = (req, res) => {

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
        totalAmount = ((loanAmount  * interestPercent * (duration * 30)) / 100) * 1/ 365;
    }else if (durationType === "year") {
        totalAmount = (loanAmount  * interestPercent * duration) / 100;
    }

    totalAmount = totalAmount + loanAmount


    res.status(200).json({message: "Success!", data: {"Loan Amount": loanAmount, "Interest Percentage": interestPercent, "Duration Type": durationType, "Duration": duration, "Total Amount": +totalAmount.toFixed(2)}});
}

exports.allLoans = (req, res, next) => {
    LOAN.find().then(loanData => {
        if(!loanData){
            throw new Error("No Data Avaliable!");
        }
        return res.status(200).json({message: 'All Loans Data!', data: loanData})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.takeLoan = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body.userId; 
    const loanAmount = req.body.loanAmount; 
    const interest = req.body.interest; 
    const durationType = req.body.durationType;
    const duration = req.body.duration; 
    const loanStartDate = req.body.loanStartDate; 
    const loanClosingDate = req.body.loanClosingDate; 
    const loanApproval = "PENDING";

    let totalAmount;
    let dailyCount;

    if(durationType === "day") {
        totalAmount = (((loanAmount * interest * duration) / 100) * 1/365);
        dailyCount = duration;
    }else if (durationType === "month") {
        totalAmount = ((loanAmount  * interest * (duration * 30)) / 100) * 1/ 365;
        dailyCount = duration * 30;
    }else if (durationType === "year") {
        totalAmount = (loanAmount  * interest * duration) / 100;
        dailyCount = duration * 365;
    }

    const dailyPayableAmount = (totalAmount + loanAmount / dailyCount).toFixed(2);
    
    const newLoan = new LOAN({userId: userId, loanAmount: loanAmount, dailyPayableAmount:dailyPayableAmount, interest: interest, durationType:durationType, duration: duration, loanStartDate: loanStartDate, loanClosingDate: loanClosingDate, loanApproval: loanApproval});
    newLoan.save().then(() => {
        return res.status(200).json({message: "Loan Details Successfully Recivied!", data: {userId, loanAmount, interest, dailyPayableAmount, duration, loanStartDate, loanClosingDate, loanApproval}})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.loanRequests = (req, res, next) => {

    LOAN.find({loanApproval: "PENDING"}).then(result => {

        if(!result){
            throw new Error("No Data Found!");
        }

        return res.status(200).json({message: "Loan Requests!", data: result})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.loanApproval = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }


    const loanId = req.body.loanId; 
    const userId = req.body.userId; 
    const loanApproval = req.body.loanApproval;

    LOAN.findOneAndUpdate({loanId: loanId, userId: userId}, {loanApproval:loanApproval},{
        new: true
    }).then((result) => {
        if(!result){
            throw new Error("No Data Found!");
        }
        TRANS.findOne({loanId: loanId, userId: userId}).then(transactions => {
            if(transactions){
                throw new Error("Loan already Approved!");
            }
            const newTrans = new TRANS({loanId: loanId, userId: userId, loanStartDate: result.loanStartDate, loanClosingDate: result.loanClosingDate, actualDayOfPay: null, dateOfPaytment: null, payableAmount: null, payedAmount: null, dueAmount: null, date: new Date()});
            newTrans.save().then(result => {
                User.findOneAndUpdate({_id: userId},{$push : {transactions: result._id} }, { new: true }).then(() => {
                    return res.status(200).json({message: "Loan Approval!", data: {loanId, userId, loanApproval}})
                })
            }).catch(err => next(err))
        })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.rejectedLoans = (req, res, next) => {
    
    LOAN.find({loanApproval: "REJECTED"}).then(result => {
        if(!result){
            throw new Error("No Data Found!");
        }
        return res.status(200).json({message: "Rejected Loan Details!", data: result});
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.loansData = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body.userId; 

    //Take from database

    LOAN.findOne({userId: userId}).then(result => {
        console.log('re', result)
        if(!result){
            throw new Error("No Data Found!");
        }

        TRANS.find({userId: userId}).then(transactionsData => {

            let dueAmount;

            if(!transactionsData){
                dueAmount = 0;
            }

            const date1 = new Date(transactionsData.date);
            const date2 = new Date();
            const diffTime = Math.abs(date2 - date1);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            const loanAmount = result.loanAmount; 
            const payedAmount = result.payedAmount; 
            dueAmount = diffDays - 1 * LOAN.dailyPayableAmount;
            const interest = result.interest; 
            const durationType = result.durationType; 
            const duration = result.duration; 
            const loanStartDate = result.loanStartDate; 
            const loanClosingDate = result.loanClosingDate; 
            return res.status(200).json({message: "Loan Data", data: {userId, loanAmount, payedAmount, dueAmount, interest, durationType, duration, loanStartDate, loanClosingDate}});
        })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}