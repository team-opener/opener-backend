const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

require('./src/db-connect')();
// require('./src/add-user')(["Ingleby", "./images/ingleby", "Backend"])
// require('./src/add-user')(["Snow", "./images/snow", "Frontend"])
// require('./src/add-user')(["Gyum", "./images/gyum", "Frontend"])
// require('./src/add-user')(["SK", "./images/sk", "IOS"])
// require('./src/add-user')(["Crong", "./images/crong.jpeg", "Frontend"])
 require('./src/temp')();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.all('/*', function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/entry', require('./routes/entry')());
app.use('/user', require('./routes/user')());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`runnning at ${port}`);
});