const axios = require('axios');
const JSON = require('circular-json');

let city = 'San Fransisco';
const apiKey = process.env.WEATHER_API_KEY;

module.exports = (app) => {
    //
    app.get('/', async(req, res) => {
        res.sendFile('index.html', { root: __dirname });
    })

    // CREATE one weather object based on the user's location
    app.post('/weather', async (req, res) => {
        if(req.query.city){
            let city = req.query.city;
        }
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const weather = await axios.post(url);

        var weatherObj = [
            {
                city: city, 
                weather: weather.data.main
            }
        ]
        res.send(weatherObj);
    })

    // CREATE one mood object and send back to user
    app.post('/mood', async (req, res) => {
        // Get mood and city via post request from the user
        if (req.query.city) {
            let city = req.query.city;
        }
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        // Use axios to ping the API and return a weather object
        const weather = await axios.post(url);
        var mood = [
            {
                mood: req.query.mood,
                city: city,
                weather: weather.data.main //Just the important stuff
            }
        ]
        // Send the mood object back to the user
        res.send(mood);
    })
}