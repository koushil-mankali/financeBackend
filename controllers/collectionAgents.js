const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator'); 

const CAG = require("../modals/collectionAgent");

exports.AllCollectionAgents = (req, res, next) => {
    CAG.find({}, {agentPassword: 0}).populate("users").then(result => {
        if(!result){
            throw new Error("No Data Found!")
        }
        
        res.status(200).json({message: "All Collection Agents Data!", data: result })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })

}

exports.createCollectionAgent = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error!", errors: errors.array() });
    }

    const agentName = req.body.agentName;
    const agentEmail = req.body.agentEmail;
    const agentPhone = req.body.agentPhone;
    const agentPassword = req.body.agentPassword;
    const agentAddress = req.body.agentAddress;
    const agentPhoto = req.file.path;
    const agentAadharNo = req.body.agentAadharNo;
    const users = [];
    const role = "agent";

    bcrypt.hash(agentPassword, 12).then(hashedPassword => {
        CAG.findOne({agentEmail:agentEmail}).then(result => {
            if(result){
                throw new Error("Agent with email already exists!")
            }
            const addAgent = new CAG({agentName: agentName, agentEmail: agentEmail, agentPhone: agentPhone, agentPassword: hashedPassword, agentAddress: agentAddress, agentAadharNo:agentAadharNo, agentPhoto:agentPhoto, users: users, role: role});
            addAgent.save().then( () => {
                res.status(201).json({message: "Succesfully Created Collection Agent!", data: {agentName, agentEmail, agentPhone, hashedPassword, agentAddress, agentPhoto, agentAadharNo, role}})
            })
        }).catch(err => {
            next(err);
        })
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}

exports.removeAgent = (req, res, next) => {

    const agentId = req.body.agentId;

    CAG.findByIdAndRemove({_id: agentId}).then(result => {
        return res.status(200).json({message: "Agent Deleted Succesfully!"});
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })
}