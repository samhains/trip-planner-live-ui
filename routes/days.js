var router = require('express').Router();
var Day = require('../models').Day;
var Hotel = require('../models').Hotel;
var async = require('async');


router.get('/', function (req, res, next){

  Day.find({},function(error,days){
   async.reduce(days, [],function(prev,day,callback){

      var funcs = [
        function(other_callback){
          Hotel.find({'id': day.hotel.id},function(err, data){
            console.log(data);
            console.log("!!!!!");
            other_callback(data);
          });
        },
        function(other_callback){

        },
        function(other_callback){

        },
      ];



      async.parallel(funcs, function(err, data){

      });

    }, function(err, data){

    });
  });


});
// router.get('/:id', function (req, res, next){
//   //get day by day ID

// });

router.delete('/:id', function (req, res, next){
  //delete day by id

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
       Day.update({number:dayToModify},{$push: {restaurants:foreignId}},function(err,data){
        if(err) return next(err);
        console.log("success",data);

      });

    }
    else if(typeStr[0]=='t'){
       Day.update({number:dayToModify},{$push: {thingsToDo:foreignId}},function(err,data){
        if(err) return next(err);
        console.log("success",data);

      });


    }
    //assign key to the relevant part of the day object
    
  console.log(req.body);
  res.send("Days");



});


module.exports = router;
