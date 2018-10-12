// Module dependincies
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var methods = require('./methods.js');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
// var $ = require('jquery');
// set app as global
app = express();
app.use(express.static('public'));
//user for parser json in body.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//TODO: use error handle in express to ensure that Express catches all errors that occur while running route handlers and middleware.
app.use(errorhandler());
app.set('view engine', 'jade');
app.get('/index',function (req,res){
    res.render('index', {title: 'Home'});
})
//Node server default is localhost:3000. If deployed in another host, will change to process env address.
app.set('port', process.env.PORT || 3000);
//set default index provide a introduction for user
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});
//assign  accepted records to the variable recordArray according to not use database. TODO:put into Mysql or MongoDB. 
var recordArray = [];
//handler the post for '/records'. Accept array of records from step 1 (user chose the format type).
app.post('/records', function (req, res) {
    console.log(getLenthOfRecords(req.body) + ' records have been accepted');
    //store all post records in recordArray
    //TODO: remove duplicate records.
    //if records is not empty, write to recordArray.
    if (getLenthOfRecords(req.body) !== 0) {
        recordArray = req.body.concat(recordArray);
    }
    console.log('Totally ' + getLenthOfRecords(recordArray) + ' records stored in REST API server.');
    res.send(JSON.stringify({ status: "accepts records successfully!" }));
    res.end();
});

app.get('/records/gender', (req, res) => {
    if (recordArray.length < 1 || recordArray === undefined) {
        res.send('No records in server now.');
        return res.status(404);
    }
    else {
        var sortBysexyArray = methods.ladyFirst(recordArray);
        var jsonRecords = arrayToJson(sortBysexyArray);
        res.send(jsonRecords);
        console.log('return totally  ' + getLenthOfRecords(jsonRecords) + ' records sorted by gender and in JSON');
        res.end();
    }
});

app.get('/records/birthdate', (req, res) => {
    if (recordArray.length < 1 || recordArray === undefined) {
        res.send('No records in server now.');
        return res.status(404);
    }
    else {
        var sortBybirthDateArray = recordArray.sort(methods.birtDateAscending);
        var jsonRecords = arrayToJson(sortBybirthDateArray);
        res.send(jsonRecords);
        console.log('return totally  ' + getLenthOfRecords(jsonRecords) + ' records sorted by birthDate and in JSON');
        res.end();
    }
});

app.get('/records/name', (req, res) => {
    if (recordArray.length < 1 || recordArray === undefined) {
        res.send('No records in server now.');
        return res.status(404);
    }
    else {
        var sortByLastNameArray = recordArray.sort(methods.lastNameAscending);
        var jsonRecords = arrayToJson(sortByLastNameArray);
        res.send(jsonRecords);
        console.log('return totally  ' + getLenthOfRecords(jsonRecords) + ' records sorted by lastName and in JSON');
        res.end();
    }
});

//return total number of records.
function getLenthOfRecords(jsonarr) {
    var count = Object.keys(jsonarr).length;
    return count;
}

//Transfer array records to records in JSON. 
function arrayToJson(recordArray) {
    var recordJson = {};
    for (var i = 0; i < recordArray.length; i++) {
        var singlerecord = {};
        for (var j = 0; j < recordArray[i].length; j++) {
            if (j === 0) {
                singlerecord['LastName'] = recordArray[i][0];
            }
            else if (j === 1) {
                singlerecord['FirstName'] = recordArray[i][1];
            }
            else if (j === 2) {
                singlerecord['Gender'] = recordArray[i][2];
            }
            else if (j === 3) {
                singlerecord['FavoriteColor'] = recordArray[i][3];
            }
            else {
                singlerecord['BirthDate'] = recordArray[i][4];
            }
        }
        recordJson[i] = singlerecord;
    }
    return recordJson;
}

//////////////////////////////////
//Start Server.
//////////////////////////////////
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = server
