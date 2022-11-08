const Custom = require('../models/custom.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    getAllCustoms: (req, res) => {
        Custom.find({})
            .populate("createdBy", "username email")
            .then((allCustoms) => res.json(allCustoms))
            .catch((err) => { res.status(400).json({ err }) });
    },

    createCustoms: (req, res) => {

        const newCustomObject = new Custom(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken, {
            complete: true
        })

        newCustomObject.createdBy = decodedJWT.payload.id;

        newCustomObject.save()

            .then((custom) => {
                console.log('custom!!!', custom);
                return res.json(custom)
            })
            .catch((err) => {
                res.status(400).json({ err });
                console.log("custom order not added");
            })
    },

    getOneCustom: (req, res) => {
        Custom.findOne({ _id: req.params.id })
            .then((oneCustom) => res.json(oneCustom))
            .catch((err) => { res.status(400).json({ err }) });
    },

    removeCustoms: (req, res) => {
        Custom.deleteOne({ _id: req.params.id })
            .then(removeCustom => res.json(removeCustom))
            .catch((err) => { res.status(400).json({ err }) });
    },

    updateCustoms: (req, res) => {
        Custom.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(updatedCustoms => res.json(updatedCustoms))
            .catch((err) => { res.status(400).json({ err }) });
    },


    findAllCustomsByUser: (req, res) => {
        if (req.jwtpayload.email !== req.params.email) {
            console.log("Not the user");
            User.findOne({ email: req.params.email })
                .then((userNotLoggedIn) => {
                    Custom.find({ createdBy: userNotLoggedIn._id })
                        .populate("createdBy", "email")
                        .then((allCustomsFromUser) => {
                            console.log(allCustomsFromUser);
                            res.json(allCustomsFromUser);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        } else {
            console.log("current user");
            console.log("======req.jwtpayload.id:", req.jwtpayload.id);
            Custom.find({ createdBy: req.jwtpayload.id })
                .populate("createdBy", "email")
                .then((allCustomsFromLoggedInUser) => {
                    console.log(allCustomsFromLoggedInUser);
                    res.json(allCustomsFromLoggedInUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }
}