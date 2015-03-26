var router = require('express').Router();
var models = require('../models');
var async = require('async');
var bluebird = require('bluebird');

router.get('/', function (req, res, next){
  // an array of promises (.exec with no cb returns a promise)
  promises = [
    models.Hotel.find({}).exec(),
    models.ThingToDo.find({}).exec(),
    models.Restaurant.find({}).exec()
  ];
  // `.all` waits for all promises to resolve,
  // `.spread` spreads results over parameters
  bluebird.all(promises).spread(function(hotels, things, cafes){
    res.render('index', {
      hotels: hotels,
      thingsToDo: things,
      restaurants: cafes
    });
  }).catch(next); // any errors, pass to next
});

module.exports = router;
