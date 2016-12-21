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
            event = events[i]; 
            //console.log("found event:", event.eventOid);
            return event;
        }
    }
    return {}; 
  }

  function searchEvents(data) {
    var events = db.events;
    var result = [];
    for (var i in events) {
        var event = events[i];
          if ( (data.urgent == 'all' || event.urgencyId == data.urgent)
               && (data.state == 'all' || data.state.indexOf(event.stateId) != -1)
             ) {
            //console.log("match event:", event.eventOid);
            result.push(event);
        }
    }
    return result;
  }

  function main() {
    app.get('/api/events', function (req, res) {
      console.log("process get all events");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json(db);
    });

    app.get('/api/event/:id', function (req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log("get event id :", req.params.id);
      var event = getEvent(req.params.id);
      var data = {"event":event};
      res.json(data);
    });
    
    app.get('/api/search', function (req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log("searching :", req.query);
      var events = searchEvents(req.query);

      var data = {"events":events};
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

