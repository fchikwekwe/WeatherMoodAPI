const Mood = require('../models/mood.js');

const axios = require('axios');

const apiKey = process.env.WEATHER_API_KEY;

module.exports = (app) => {
    // ROOT (SHOW all moods)
    app.get('/moods', (req, res) => {
        Mood.find()
            .then(moods => {
                res.json(moods);
            })
            .catch(error => {
                console.log(error);
            })
    })

    // CREATE one mood
    app.post('/moods/new', async (req, res) => {
        // console.log(req.query);
        let city = req.query.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


        const weather = await axios.post(url);

        var mood = [
            {
                mood: req.query.mood,
                city: city,
                weather: weather
            }
        ]
        console.log("something")
        let save = await saveMood(mood);

        console.log('redirecting');
        // return res.redirect('/moods');
    })

    function saveMood(mood) {
        const moodDoc = Mood.create(mood);
        return moodDoc
    }

    // SHOW one mood
    app.get('/moods/:id', (req, res) => {
        Mood.findById(req.params.id)
            .then(mood => {
                res.json(mood);
            })
            .catch(error => {
                console.log(error);
            })
    })

    // UPDATE one mood
    app.put('/moods/:id', (req, res) => {
        Mood.findByIdAndUpdate(req.params.id, req.body)
            .then(mood => {
                res.redirect(`/moods/:id`);
            })
            .catch(error => {
                console.log(error);
            })
    })

    // DELETE one mood
    app.delete('/moods/:id', (req, res) => {
        Mood.findByIdAndRemove(req.params.id)
            .then(mood => {
                res.redirect('/moods');
            })
            .catch(error => {
                console.log(error);
            })
    })
}