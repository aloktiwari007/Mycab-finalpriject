var express=require('express');
var multer=require('multer');
var router=express.Router();
var tariff=require('../model/tariff.js');


router.post('/tariff',function(req,res){



console.log(req.body);
var tariff1=new tariff();

tariff1.Startpeakhour=req.body.start,
tariff1.Endpeakhour=req.body.end,
tariff1.Peakrate=req.body.peakRate,
tariff1.Normalrate=req.body.normalRate,
tariff1.Cabtype=req.body.tariffVehicleType


tariff1.save(function(err){

if(err)
{
  res.json(err);
}
else {
  console.log("else called");
  res.json({success:true});
  // console.log('tariff api calleds');
}

})

});


router.get('/tariff', function (req, res) {
  console.log("REACHED GET DATA ON SERVER");
  tariff.find({}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});


router.put('/driver/:id', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  driver.findOneAndUpdate({_id:req.params.id},req.body, function (err, docs) {
    if (err)
{
  res.json({invalid:tr});
  console.log('Error at get ' + err);

}

    else
    {
      res.json({success:true});
    }

    //  console.log(docs);
  });
});

router.put('/tariff/:id', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  console.log(req.body);
  tariff.findOneAndUpdate({_id:req.params.id},req.body, function (err, docs) {
    if (err)
{
    res.json({invalid:true});
    console.log('Error at get ' + err);
  }

    else
    {
    res.json(docs);
    }

    //  console.log(docs);
  });
});


router.delete('/tariff/:id', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  tariff.remove({_id:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});

 // });


 router.get('/tariff/:vehicletype', function (req, res) {
   console.log("REACHED GET DATA ON SERVER12345689"+req.params.vehicletype);
   tariff.findOne({Cabtype:req.params.vehicletype},function(err,docs)   {
     if (err) console.log('Error at get ' + err);
     else
      res.json(docs);
      console.log("hhhh"+docs);
   });

 });



module.exports = router;
