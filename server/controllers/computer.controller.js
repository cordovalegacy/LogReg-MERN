const Computer = require('../models/computer.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    getAllComputers: (req, res) => {
        Computer.find({})
            .populate("createdBy", "username email")
            .then((allComputers) => res.json(allComputers))
            .catch((err) => { res.status(400).json({ err }) });
    },

    createComputers: (req, res) => {

        const newComputerObject = new Computer(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken, {
            complete: true
        })

        newComputerObject.createdBy = decodedJWT.payload.id;

        newComputerObject.save()

            .then((computer) => {
                console.log('computer!!!', computer);
                return res.json(computer)
            })
            .catch((err) => {
                res.status(400).json({ err });
                console.log("computer not added");
            })
    },

    getCheckoutComputers: (req, res) => {
        Computer.findOne({ _id: req.params.id })
            .then((oneComputer) => res.json(oneComputer))
            .catch((err) => { res.status(400).json({ err }) });
    },

    removeComputers: (req, res) => {
        Computer.deleteOne({ _id: req.params.id })
            .then(removeComputer => res.json(removeComputer))
            .catch((err) => { res.status(400).json({ err }) });
    },

    findAllComputersByUser: (req, res) => {
        if (req.jwtpayload.email !== req.params.email) {
            console.log("Not the user");
            User.findOne({ email: req.params.email })
                .then((userNotLoggedIn) => {
                    Computer.find({ createdBy: userNotLoggedIn._id })
                        .populate("createdBy", "email")
                        .then((allComputersFromUser) => {
                            console.log(allComputersFromUser);
                            res.json(allComputersFromUser);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        } else {
            console.log("current user");
            console.log("======req.jwtpayload.id:", req.jwtpayload.id);
            Computer.find({ createdBy: req.jwtpayload.id })
                .populate("createdBy", "email")
                .then((allComputersFromLoggedInUser) => {
                    console.log(allComputersFromLoggedInUser);
                    res.json(allComputersFromLoggedInUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }
}