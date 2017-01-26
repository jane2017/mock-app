//

var path = require('path');
var https = require('https');
var Q = require('q');
//var oracledb = require('oracledb');

var configs = require('./config.json');
var express = require('express');
var app = express();
var db = require('./db.json');
var allevents = db.events;

var Q = require('q');
/*var oracledb = require('oracledb');
var odbSettings = {
  "user": "srs",
  "password": "finadmin",
  "connectString": "oracle7.dev.itlab.internap.com/icdtst71"
};*/

function metsServer () {

/*  function connect(options) {
    var deferred = Q.defer();
    oracledb.getConnection(options, function (err, connection) {
      if (err) {
        util.log('connection failed');
        util.log(err.message);
        return deferred.reject(err);
      }
      return deferred.resolve(connection);
    });
    return deferred.promise;
  }*/

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

  function updateEvent(event) {
    console.log("update event id:", event.eventOid);
    for (var i in allevents) {
      if (allevents[i].eventOid === event.eventOid) {
        allevents[i] = event; 
        console.log("found event:", allevents[i].eventOid);
        break;
      }
    }
  }

  function searchEvents(data) {
    var events = db.events;
    var result = [];
    if (data.urgent === undefined || data.urgent === '') {
      data.urgent = ["all"];
    }

    if (data.state == undefined || data.state === '') {
      data.state = ["all"];
    }

    for (var i in events) {
        var event = events[i];
          if ( (data.urgent.includes('all') || data.urgent.includes(event.urgencyId))
               && (data.state.includes('all') || data.state.includes(event.stateId))
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

    app.get('/api/update', function (req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      //console.log("update event :", req.query.event);
      updateEvent(JSON.parse(req.query.event));
      var data = {"event":""};
      res.json(data);
    });

    // TODO: regex for id
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

/*    app.get('/api/allevents', function(req, res) {
       Q.all([connect(odbSettings)])
       .then(function(connections) {
          conn = connections[0];
          var queries = [];
          console.log("connected to oracle db!", conn);
       });
    });*/

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

