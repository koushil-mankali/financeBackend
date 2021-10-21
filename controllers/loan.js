const LOAN = require("../modals/loan");
const TRANS = require("../modals/transactions");
const { validationResult } = require('express-validator'); 

exports.takeLoan = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body.userId; 
    const loanAmount = req.body.loanAmount; 
    const interest = req.body.interest; 
    const duration = req.body.duration; 
    const loanStartDate = req.body.loanStartDate; 
    const loanClosingDate = req.body.loanClosingDate; 
    const loanApproval = "pending";

    const newLoan = new LOAN({userId: userId, loanAmount, loanAmount, interest: interest, duration: duration, loanStartDate: loanStartDate, loanClosingDate: loanClosingDate, loanApproval: loanApproval});
    newLoan.save().then(() => {
        return res.status(200).json({message: "Loan Details Successfully Recivied!", data: {userId, loanAmount, interest, duration, loanStartDate, loanClosingDate, loanApproval}})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.loanRequests = (req, res) => {

    LOAN.find({loanApproval: "pending"}).then(result => {

        if(!result){
            throw new Error("No Data Found!");
        }

        // Take from database
        const userId = result.userId; 
        const loanAmount = result.loanAmount; 
        const interest = result.interest; 
        const duration = result.duration; 
        const loanStartDate = result.loanStartDate; 
        const loanClosingDate = result.loanClosingDate; 
        const loanApproval = result.loanApproval;

        return res.status(200).json({message: "Loan Requests!", data: {userId, loanAmount, interest, duration, loanStartDate, loanClosingDate, loanApproval}})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.loanApproval = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }


    const loanId = req.body.loanId; 
    const userId = req.body.userId; 
    const loanApproval = req.body.loanApproval;

    LOAN.find({loanId: loanId, userId:userId}).then(result => {
        if(!result){
            throw new Error("No Data Found!");
        }
        result.loanApproval = loanApproval;
        result.save().then( () => {
            return res.status(200).json({message: "Loan Approval!", data: {loanId, userId, loanApproval}})
        })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.rejectedLoans = (req, res) => {
    
    LOAN.find({loanApproval: "rejected"}).then(result => {
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

exports.loansData = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const userId = req.body.userId; 

    //Take from database

    LOAN.find().then(result => {
        if(!result){
            throw new Error("No Data Found!");
        }

        TRANS.find({userId: userId}).then(transactionsData => {

            let dueAmount;

            if(!transactionsData){
                dueAmount = 0;
            }

            const date1 = new Date(transactionData.date);
            const date2 = new Date();
            const diffTime = Math.abs(date2 - date1);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            const loanAmount = result.loanAmount; 
            const payedAmount = result.payedAmount; 
            dueAmount = diffDays - 1 * LOAN.dailyPayableAmount;
            const interest = result.interest; 
            const duration = result.duration; 
            const loanStartDate = result.loanStartDate; 
            const loanClosingDate = result.loanClosingDate; 
        })
    
        return res.status(200).json({message: "Loans Data", data: {userId, loanAmount, payedAmount, dueAmount, interest, duration, loanStartDate, loanClosingDate}});
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}