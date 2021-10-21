const BP = require("../modals/bussinessProfile");
const { validationResult } = require('express-validator'); 

exports.getData = (req, res) => {
    BP.find().then(data => {
        if(!data){
            throw "No data!";
        }
        return res.status(200).json({message: "Success", data: data})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.postData = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    BP.findOne({}).then(result => {
        if(result){
            result.companyName = req.body.companyName;
            result.logo = req.file.path;
            result.companyAddress = req.body.companyAddress;
            result.gstNo = req.body.gstNo;
            result.panNo = req.body.panNo;
            result.aadharNo = req.body.aadharNo;
            result.capitalInvestment = req.body.capitalInvestment;

            result.save().then(() => {
                res.status(201).json({message: "Succesfully Updated!", data: {companyName, logo, companyAddress, gstNo, panNo, aadharNo, capitalInvestment}});
            }).catch(err => { throw err })
        }
        const companyName = req.body.companyName;
        const logo = req.file.path;
        const companyAddress = req.body.companyAddress;
        const gstNo = req.body.gstNo;
        const panNo = req.body.panNo;
        const aadharNo = req.body.aadharNo;
        const capitalInvestment = req.body.capitalInvestment;

        const newBP = new BP({companyName: companyName, logo: logo, companyAddress: companyAddress, gstNo: gstNo, panNo: panNo, aadharNo: aadharNo, capitalInvestment: capitalInvestment});
        newBP.save().then( () => {
            res.status(201).json({message: "Succesfully Created!", data: {companyName, logo, companyAddress, gstNo, panNo, aadharNo, capitalInvestment}});
        }).catch(err => { throw(err) })

    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}