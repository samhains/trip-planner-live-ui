var router = require('express').Router();
var Day = require('../models').Day;
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var ThingToDo = require('../models').ThingToDo;
var async = require('async');
var bluebird = require('bluebird');


router.get('/', function (req, res, next){

    Day.find({},function(err,days){

      var allDaysPromise = bluebird.map(days,function(day){
        if(day){
            var thingsToDoIds = day.thingsToDo;
            var hotelId = day.hotel;
            var restaurantIds = day.restaurants;

            var hotelPromise = Hotel.findOneAsync({'_id':hotelId});

            var restaurantPromise = bluebird.map(restaurantIds,function(restaurantId){
              return Restaurant.findOneAsync({'_id':restaurantId});
            });

            var thingsPromise = bluebird.map(thingsToDoIds,function(thingsId){
              return ThingToDo.findOneAsync({'_id':thingsId});
            });

            var dayPromises=[hotelPromise,restaurantPromise,thingsPromise];

            return bluebird.all(dayPromises);
        }
      });

      allDaysPromise.then(function(days){
        console.log("days",days);
        res.send(days);
      });


      
    });








});
// router.get('/:id', function (req, res, next){
//   //get day by day ID

// });


router.delete('/marker', function (req, res, next){
   console.log("!!!");
    var name = req.body.name;
    var day  = req.body.day;
    var type = req.body.type;
    var key = req.body.foreignKey;
    console.log("!!!");
    console.log(key)
    if (type[1] == 'h'){
      console.log("!!!!!");
      Day.update({number: day}, {hotel: null}, function(err, data){
        console.log(err, data);
        res.send("death!");
      });
    }else if (type[1] == 'r'){
      console.log(key)
      Day.update({number: day}, {$pull: {restaurants: key}} , function(err, data){
      res.send("death!");
      });
    }else if (type[1] == 't'){
      Day.update({number: day}, {$pull: {thingsToDo: key}}, function(err, data){
      res.send("death!");
    });
    }
});

router.delete('/:id', function (req, res, next){
  var id = req.params.id;
  console.log("ID",id);
  Day.find({number:id}).remove(function(err,data){
    console.log(err,data);
  });
  res.send("DELETED DAY");

});



router.post('/:id', function (req, res, next){
  //create a new day
  //create new object for mongoose daySchema
  console.log("post request");
  var number = req.params.id;
  var newDay = new Day({number:number});
  newDay.save(function(err,day){
    if(err) return next(err);
    res.send(day);
  });

});


router.put('/:id', function (req, res, next){
  var dayToModify = parseInt(req.params.id);
  var foreignId = req.body.key;
  var typeStr = req.body.typeStr;
  console.log(typeStr);
  console.log(dayToModify);



    if(typeStr[0]=='h'){
      Day.update({number:dayToModify},{hotel:foreignId},function(err,data){
        if(err) return next(err);
        console.log("success",data);

      });

        //add reference to  day document

    }
    else if(typeStr[0]=='r'){

       Day.update({number:dayToModify},{$addToSet: {restaurants:foreignId}},function(err,data){
        if(err) return next(err);
        console.log("success",data);

      });

    }
    else if(typeStr[0]=='t'){
       Day.update({number:dayToModify},{$addToSet: {thingsToDo:foreignId}},function(err,data){
        if(err) return next(err);
        console.log("success",data);

      });


    }
    //assign key to the relevant part of the day object

  console.log(req.body);
  res.send("Days");



});


module.exports = router;
