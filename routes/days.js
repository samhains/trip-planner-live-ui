var router = require('express').Router();
var Day = require('../models').Day;



router.get('/days', function (req, res, next){
  // Day.find({},function(error,days){
  //   if(err) return next(err);

  //   res.send(days);
  // });
  // 
  res.send('HEY');

});
// router.get('/days/:id', function (req, res, next){
//   //get day by day ID

// });

router.delete('/days/:id', function (req, res, next){
  //delete day by id

});

router.post('/days/:id', function (req, res, next){
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


router.put('/days/:id', function (req, res, next){
  //this is where you update individual markers for the day
  res.send("Days");


});


module.exports = router;
