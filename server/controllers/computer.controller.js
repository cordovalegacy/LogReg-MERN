const Computer = require('../models/computer.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    getAllComputers: (req, res) => {
        Computer.find({})
            .populate("createdBy", "username email")
            .then((allComputers) => res.json(allComputers))
            .catch((err) => { res.status(400).json({err}) });
    },

    createComputers: (req, res) => {

        const newComputerObject = new Computer(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken, {
            complete: true
        })

        newComputerObject.createdBy = decodedJWT.payload.id;

        newComputerObject.save()
            
            .then((computer)=> {
                console.log('computer!!!', computer);
                return res.json(computer)
            })
            .catch((err)=> {
                res.status(400).json({err});
                console.log("computer not added");
            })
        },
            
    getCheckoutComputers: (req, res) => {
        Computer.findOne({_id: req.params.id})
        .then((oneComputer) => res.json(oneComputer))
        .catch((err) => { res.status(400).json({err}) });
    },
    
    removeComputers: (req, res) => {
        Computer.deleteOne({_id: req.params.id})
            .then(removeComputer => res.json(removeComputer))
            .catch((err) => { res.status(400).json({err}) });
        },
}