const router = require('express').Router();
const entryController = require('./entry-controller');

module.exports = () => {
    router.post('/', entryController.updateUserEntryInfo, entryController.sendRequestToOpen);
    return router;
}