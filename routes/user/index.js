const router = require('express').Router();
const userController = require('./user-controller');

module.exports = () => {
    router.get('/info', userController.getInfo);
    router.get('/info/all', userController.getInfoAll);
    return router;
}