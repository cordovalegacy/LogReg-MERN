const UserController = require('../controllers/user.controller');
const {authenticate} = require ('../config/jwt.config');

module.exports = (app) => {
    //USER SECTION START
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users", authenticate, UserController.getLoggedInUser);
    //USER SECTION END
}