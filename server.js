var express = require('express');
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
     
    response.json(request.body);
});

app.post("/readjson", jsonParser, function (request, response) { 
    let ToSend = {'one':'111', 'two':'222'}; 
    response.setHeader('Content-Type', 'application/json');
    //response.statusCode('200');
    response.end(JSON.stringify(ToSend));
});

app.listen(3000);