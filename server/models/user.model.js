const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email Address is required'],
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(v);
            },
            message: "Please enter a valid email address",
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Passwords MUST be at least 8 characters']
    }
}, {timestamps: true});

UserSchema.virtual("confirmPassword")
.get(() => this._confirmPassword)
.set((value) => this._confirmPassword = value)


//this process works like a vetting process
UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match")
        console.log("Passwords don't match!")
    }
    next()
})

UserSchema.pre("save", function(next){
    console.log("in pre-save in model");

    //hash the password BEFORE it's saved to the DB
    //Remeber we know they match from the middleware above

    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            
            //this will give our password the value of the reutrned hash
            this.password = hashedPassword;
            next()
        })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;