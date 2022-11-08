const mongoose = require('mongoose');
const CustomSchema = new mongoose.Schema({

    fullName:
    {
        type: String,
        required : [true, "Name is required"],
        minLength : [3, "Must exceed three characters"],
        maxLength : [35, "Cannot exceed thirty-five characters"]
    },

    email:
    {
        type: String,
        required : [true, "Email Address is required"],
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(v);
            },
            message: "Please enter a valid email address",
        }
    },

    phoneNumber:
    {
        type: Number,
        required : [true, "Phone Number is required"]
    },
    
    budget:
    {
        type: String,
        required : [true, "Enter a budget you'd like to stick to"]
    },
    
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
        required : [true, "Cooling is required"]
    },

    theme:
    {  
        type: String,
        required : [true, "Desired aesthetic is required"],
        maxLength : [50, "cannot exceed fifty characters"], 
        minLength : [5, "must be at least five characters"], 
    },

    special: 
    {
        type: String,
        maxLength : [100, "cannot exceed one-hundred characters"]
    },

    createdBy: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });


module.exports = mongoose.model('Custom', CustomSchema);