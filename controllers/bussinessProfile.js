const BP = require("../modals/bussinessProfile");
const { validationResult } = require('express-validator'); 

exports.getData = (req, res) => {
    BP.findOne().then(data => {
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

exports.postData = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    BP.findOne().then(result => {
        if(result){
            const companyName = req.body.companyName;
            const companyLogo = req?.file?.path;
            const companyAddress = req.body.companyAddress;
            const gstNo = req.body.gstNo;
            const panNo = req.body.panNo;
            const aadharNo = req.body.aadharNo;
            const capitalInvestment = req.body.capitalInvestment;
            BP.findByIdAndUpdate(result._id, {companyName: companyName, companyLogo:companyLogo, companyAddress: companyAddress, gstNo: gstNo, panNo: panNo, aadharNo: aadharNo, capitalInvestment: capitalInvestment}, (err, docs) => {
                if(err){
                    throw new Error("Unable to update data!");
                }
                return res.status(201).json({message: "Succesfully Updated!", data: docs});
            })
        
        }else {
            const companyName = req.body.companyName;
            const companyLogo = req.file.path;
            const companyAddress = req.body.companyAddress;
            const gstNo = req.body.gstNo;
            const panNo = req.body.panNo;
            const aadharNo = req.body.aadharNo;
            const capitalInvestment = req.body.capitalInvestment;

            const newBP = new BP({companyName: companyName, companyLogo:companyLogo, companyAddress: companyAddress, gstNo: gstNo, panNo: panNo, aadharNo: aadharNo, capitalInvestment: capitalInvestment});
            newBP.save().then( () => {
                res.status(201).json({message: "Succesfully Created!", data: {companyName, companyLogo, companyAddress, gstNo, panNo, aadharNo, capitalInvestment}});
            }).catch(err => { throw(err) })
        }
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}