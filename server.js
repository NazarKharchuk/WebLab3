var express = require('express');
const fs = require("fs");
const res = require('express/lib/response');

var app = express();

app.use('/static', express.static('static'));

const jsonParser = express.json();

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.get('/cssslider', function(req, res){
    res.sendFile(__dirname + "/secondpage.html")
});

app.post("/savejson", jsonParser, function (request, response) {
    console.log(request.body);

    if(!request.body) return response.sendStatus(400);
     
    fs.writeFile('file.json', JSON.stringify(request.body), err => {
        if(err){
            console.log(err);
            return response.sendStatus(500);
        } else{
            console.log('File written');
        }
    });

    response.json(request.body);
});

app.post("/readjson", jsonParser, function (request, response) { 
    fs.readFile('file.json', 'utf-8', (err, jsonString)=>{
        if(err){
            console.log(err);
            return response.sendStatus(500);
        } else{
            console.log('File readed');
            ToSend = jsonString;
            console.log(JSON.parse(jsonString));
            response.setHeader('Content-Type', 'application/json');
            response.end(jsonString);
        };
    });
});

app.listen(3000);