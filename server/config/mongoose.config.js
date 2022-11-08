const mongoose = require("mongoose");

// const computerDB = "computerDB";


//if a DB by this name does NOT exist before running it the first time then this will create that DB
mongoose.connect(`mongodb://127.0.0.1/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`You are connected to the database called ${process.env.DB_NAME}`)
    })
    .catch((err) => {
        console.log(`You ran into an error while connecting to ${process.env.DB_NAME}. Here is your error:`, err)
    })