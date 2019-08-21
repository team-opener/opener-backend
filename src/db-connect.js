const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://alice:0000@cluster0-hs1qe.mongodb.net/test?retryWrites=true&w=majority';

module.exports = async () => {
    try {
        mongoose.connect(dbURI, {useNewUrlParser: true, useFindAndModify: false});
        const db = mongoose.connection;
        db.on('open', () => {
            console.log('Connected to MongoDB');
        });
    
        db.on('error', (error) => {
            console.log(error);
        });
        return db;
      } catch (error) {
        console.log(error);
      }
}