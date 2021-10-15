const express = require('express');
const app = express();
const https = require('https');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html");
   
});

app.post('/', function (req, res){

    var name = req.body.cityname;
    console.log(name);

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=b592a98d4c0e2a07b4cd4f241ede84b9#";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {

            weatherdata = JSON.parse(data);
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const temp = weatherdata.main.temp;

            console.log(imageurl)
            const weatherdesc = weatherdata.weather[0].description
            console.log(weatherdesc)
            res.write("<h1>Temperature in " + name + " is " + temp + " degrees</h1>")
            res.write("<p>Weather desciption is " + weatherdesc + ".</p>")
            res.write("<img src = " + imageurl + ">")
            res.send();
        })
    })
});


app.listen(3000, function () {
    console.log("HI");
});