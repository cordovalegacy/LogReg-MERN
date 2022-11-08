const CustomController = require('../controllers/custom.controller');
// const {authenticate} = require ('../config/jwt.config');

module.exports = (app) => {
    //CUSTOM SECTION START
    app.get('/api/computers/customs', CustomController.getAllCustoms);
    app.post('/api/computers/customs', CustomController.createCustoms);
    app.get('/api/computers/customs/checkout/:id', CustomController.getOneCustom);
    app.delete('/api/computers/customs/:id', CustomController.removeCustoms);
    app.put('/api/computers/customs/edit/:id', CustomController.updateCustoms);
    //CUSTOM SECTION END
}