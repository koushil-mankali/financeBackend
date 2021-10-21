const bcrypt = require("bcryptjs");

const CAG = require("../modals/collectionAgent");

exports.AllCollectionAgents = (req, res) => {

    CAG.find().then(result => {
        if(!result){
            throw new Error("No Data Found!")
        }
         //Take from database
        const agentName = result.agentName;
        const agentEmail = result.agentEmail;
        const agentPhone = result.agentPhone;
        const agentAddress = result.agentAddress;
        const agentPhoto = result.path;
        const agentAadharNo = result.agentAadharNo;
        const userStatus = result.status;
        const users = result.users;

        res.status(200).json({message: "All Collection Agents Data!", data: {agentName, agentEmail, agentPhone, agentPassword, agentAddress, agentPhoto, agentAadharNo, userStatus, users}})
    }).catch(err => {
        let error = new Error(err);
        error.statuscode = 401
        next(error)
    })

}

exports.createCollectionAgent = (req, res) => {

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
        CAG.find({agentEmail:agentEmail}).then(result => {
            if(result){
                throw new Error("Agent with email already exists!")
            }
            const addAgent = new CAG({agentName: agentName, agentEmail: agentEmail, agentPhone: agentPhone, agentPassword: hashedPassword, agentAddress: agentAddress, agentPhoto: agentPhoto, users: users, role: role});
            addAgent.save().then( () => {
                res.status(201).json({message: "Succesfully Created Collection Agent!", data: {agentName, agentEmail, agentPhone, hashedPassword, agentAddress, agentPhoto, agentAadharNo, role}})
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