const mongoose = require('mongoose')

const ComputerSchema = new mongoose.Schema({

    cpu: 
    {  
        type: String,
        required : [true, "CPU is required"]
    },

    gpu:
    {  
        type: String,
        required : [true, "GPU is required"]
    },

    ram:
    {  
        type: String,
        required : [true, "RAM is required"]
    },

    storage:
    { 
        type: String,
        required : [true, "Storage is required"]
    },

    cooling:
    {  
        type: String,
        required : [true, "Cooler is required"]
    },

    psu:
    {
        type: String
    },

    motherboard:
    {
        type: String
    },

    case:
    {
        type: String
    },

    accessories:
    {
        type: String
    },

    createdBy: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });


module.exports = mongoose.model('Computer', ComputerSchema);