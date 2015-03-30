var router = require('express').Router();
var Day = require('../models').Day;



router.get('/', function (req, res, next){
  Day.find({},function(error,days){
    if(error) return next(error);

    res.send(days);
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
  //this is where you update individual markers for the day
  res.send("Days");


});


module.exports = router;
