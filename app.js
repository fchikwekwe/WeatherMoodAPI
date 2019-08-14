
require('dotenv').config();

const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weather-mood', { useNewUrlParser: true });

// require('./controllers/users.js')(app);
require('./moods.js')(app);

app.listen(PORT, () => {
    console.log('Weather Mood app listening on port', PORT, '!');
})

module.exports = app;

