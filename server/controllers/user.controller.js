const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register: (req, res) => {

//we will now use the req data and the User model constructor (use user.model as ref) to create the user object
        const user = new User(req.body)

//info is already in the instance of THIS object so no need to pass anything in
//save is an instance METHOD, doesnt require anything to be passed in
//create is STATIC and takes the object as a parameter
        user.save()
        .then((newUser) => {
            console.log(newUser);
            console.log("Successful Registration");
            res.json({
                successMessage: "Thank you for registering!",
                user: newUser
            })
        })
        .catch((err) => {
            console.log("Registration unsuccessful")
            res.status(400).json(err)
        })
    },

    login: (req, res) => {
        User.findOne({email: req.body.email})
        .then((userRecord) => {

            //checks if this returned object is null
            if(userRecord === null){
                res.status(400).json({message: "Invalid login attempt"})
            } else {
                //email is found
                bcrypt.compare(req.body.password, userRecord.password)
                //boolean: t/f
                .then((isPasswordValid) => {
                    if(isPasswordValid){
                        console.log("Password is valid");
                        res.cookie(
                            "userToken",
                            jwt.sign({
                                //payload we want to save
                                id: userRecord._id,
                                email: userRecord.email,
                                username: userRecord.username
                                    },
                                        //we need a key to sign and hash cookies data
                                        //our payload needs a secret key. we will use a .env file to store such things privately
                                        process.env.JWT_SECRET
                                    ),
                                        //invisible to client side js and can only be read by the server
                                        //httpOnly is for added security
                                        {
                                            httpOnly: true,
                                            expires: new Date(Date.now() + 90000000)
                                        }
                            ).json({
                                message: "Success!! !! !!",
                                userLoggedIn: userRecord.username,
                                // userId: userRecord._id
                            })
                    } else {
                        res.status(400).json({message: "Invalid Attempt"})
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({message: "Invalid Attempt!"});
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: "Invalid Attempt!!"});
        })
    },

    logout: (req, res) => {
        console.log("Logging out");
        res.clearCookie("userToken");
        res.json({
            message: "Success! You have logged out",
        });
    },

    getLoggedInUser: (req, res) => {

        const decodedJWT = jwt.decode(req.cookies.userToken, {
            complete: true
        })

        User.findOne({_id: decodedJWT.payload.id})
            .then((user) => {
                console.log(user);
                res.json(user)
            })
                .catch((err) => {
                    console.log(err);
                })

    }
}