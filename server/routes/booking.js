var express=require('express');
var multer=require('multer');
var router=express.Router();
var booking=require('../model/booking.js');

router.post('/booking',function(req,res){



console.log("the data is"+req.body.pickupdatedate);
var booking1=new booking();

booking1.Pickuplocation=req.body.bookSource,
booking1.Deastinationlocation=req.body.bookDestination,
booking1.Fare=req.body.fare,
booking1.Cabetype=req.body.cabtype,
booking1.Drivername=req.body.dirname,
booking1.Vehiclenumber=req.body.vehiclenumber,
booking1.Drivermobilenumber=req.body.mobile,
booking1.Custname=req.body.custname,
booking1.Custmobileno=req.body.custmobileno,
booking1.Bookingstatus=req.body.bookingstatus,
booking1.Distance=req.body.distance,
booking1.Bookingtype=req.body.bookingtype,
booking1.BookingDate=req.body.bookingdate,
booking1.PickupDate=req.body.pickupdatedate,
booking1.DriverBookingstatus=req.body.driverbookingstatus,
booking1.DriverEmail=req.body.demail,
booking1.CustEmail=req.body.cemail
booking1.save(function(err){

if(err)
{
  console.log("error"+ err);
  res.json(err);
}
else {
  console.log("suss");
  res.json({

    success:true
  });
  console.log('booking api calleds');
}

})

});
//, PickupDate:req.params.PickupDate
//req.params.vnumber    req.params.driverbookingstatus
// router.get('/booking/:vehiclenumber/:driverbookingstatus', function (req, res) {
//   console.log("REACHED GET DATA ON SERVER");
//   booking.findOne({Vehiclenumber:req.params.vehiclenumber ,DriverBookingstatus:req.params.driverbookingstatus},function (err, docs) {
//     if (err) console.log('Error at get ' + err);
//     else
//      res.json(docs);
//       console.log("retrive data "+docs);
//   });
// });

router.get('/booking3/:demail/:driverbookingstatus', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  console.log("demail booking call");
  booking.find({DriverEmail:req.params.demail ,DriverBookingstatus:req.params.driverbookingstatus},function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
      console.log("retrive data "+docs);
  });
});


router.get('/booking/:demail/:driverbookingstatus', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  console.log("demail booking call");
  booking.findOne({DriverEmail:req.params.demail ,DriverBookingstatus:req.params.driverbookingstatus},function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
      console.log("retrive data "+docs);
  });
});

router.get('/booking2/:cemail/:driverbookingstatus', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  console.log("demail booking call");
  booking.find({CustEmail:req.params.cemail ,DriverBookingstatus:req.params.driverbookingstatus},function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
      console.log("retrive data "+docs);
  });
});


router.get('/booking1/:id/', function (req, res) {
  console.log("REACHED GET DATA ON SERVER123456");
  console.log(req.params.id);
  booking.find({DriverEmail:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
     console.log(docs);
  });
});



router.get('/booking/:id/', function (req, res) {
  console.log("REACHED GET DATA ON SERVER");
  console.log(req.params.id);
  booking.find({CustEmail:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
     console.log(docs);
  });
});

router.get('/booking/:id/:type', function (req, res) {
  console.log("REACHED GET DATA ON SERVER123454");
  console.log(req.params.id);
  booking.find({CustEmail:req.params.id,Bookingtype:req.params.type}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
     console.log(docs);
  });
});





router.get('/booking', function (req, res) {
  console.log("REACHED GET DATA ON SERVER123454");

  booking.find({}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
     console.log(docs);
  });
});






router.put('/booking/:data', function (req, res) {
  console.log("enter in put");
  booking.update({_id:req.params.data},{$set:{DriverBookingstatus:req.body.DriverBookingstatus}}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});






router.put('/booking1/:data', function (req, res) {
  console.log("enter in put1");
  console.log(req.body);
  booking.update({_id:req.params.data},{$set:{DriverBookingstatus:req.body.driverbookingstatus,
    Drivername:req.body.dirname,
    Vehiclenumber:req.body.vehiclenumber,
    DriverEmail:req.body.demail,
    Drivermobilenumber:req.body.mobile}}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});



router.delete('/booking/:id', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  booking.remove({_id:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});




module.exports = router;
