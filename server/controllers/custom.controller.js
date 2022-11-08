const Custom = require('../models/custom.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    getAllCustoms: (req, res) => {
        Custom.find({})
            .populate("createdBy", "username email")
            .then((allCustoms) => res.json(allCustoms))
            .catch((err) => { res.status(400).json({err}) });
    },

    createCustoms: (req, res) => {

        const newCustomObject = new Custom(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken, {
            complete: true
        })

        newCustomObject.createdBy = decodedJWT.payload.id;

        newCustomObject.save()
            
            .then((custom)=> {
                console.log('custom!!!', custom);
                return res.json(custom)
            })
            .catch((err)=> {
                res.status(400).json({err});
                console.log("custom order not added");
            })
        },
            
    getOneCustom: (req, res) => {
        Custom.findOne({_id: req.params.id})
        .then((oneCustom) => res.json(oneCustom))
        .catch((err) => { res.status(400).json({err}) });
    },
    
    removeCustoms: (req, res) => {
        Custom.deleteOne({_id: req.params.id})
            .then(removeCustom => res.json(removeCustom))
            .catch((err) => { res.status(400).json({err}) });
        },

    updateCustoms: (req, res) => {
        Custom.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(updatedCustoms => res.json(updatedCustoms))
        .catch((err) => { res.status(400).json({err}) });
        },
}