//

var path = require('path');
var https = require('https');
var Q = require('q');
//var oracledb = require('oracledb');

var configs = require('./config.json');
var express = require('express');
var app = express();
var db = require('./db.json');

function metsServer () {

  function getEvent(id) {
    var events = db.events;
    console.log("process get event with id:", id);
    var event = {};
    for (var i in events) {
        if (events[i].eventOid == id) {
            console.log("found event:", events[i]);
            event = events[i]; 
            return event;
        }
    }
    return {}; 
  }

  function main() {
    app.get('/api/events', function (req, res) {
      console.log("process get events");
    //res.send('HelloWorld!')
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(db);
    });

    app.get('/api/event/:id', function (req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      var event = getEvent(req.params.id);
      var data = {"event":event};
      res.json(data);
    });

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    });
  }

  function run() {
    main();
  }

  return {
    main: main,
    run: run
  };
}

module.exports = metsServer();

