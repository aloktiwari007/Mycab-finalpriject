var express=require('express');
var multer=require('multer');
var router=express.Router();
var driver=require('../model/driver.js');
var jwt=require('jsonwebtoken');
//  router.use(upload());

//
// var Storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, "../driverimg");
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });



router.post('/driver',function(req,res){
   //Field name and max count
//    var upload = multer({ storage: Storage }).single(req.body.n);
// console.log(upload);
//   upload(req, res, function (err) {
//           if (err) {
//                  res.json("Something went wrong!"+{err});
//               return;
//             //  console.log("Something went wrong!");
//           }
//             res.json({
//               err_code:0
//             });
//             //console.log("File uploaded sucessfully!.");
//       });

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html");
// });


console.log("value pf password "+ req.body.password);

var driver1=new driver();



driver1.Email=req.body.email,
driver1.Name=req.body.name,
driver1.MobileNo=req.body.phone,
driver1.Usertype=req.body.type,
driver1.Address=req.body.address,
driver1.Dlnumber=req.body.dl,
driver1.Vehiclename=req.body.vname,
driver1.Vehiclenumber=req.body.vnumber,
driver1.Vehiclemake=req.body.vmake,
driver1.Vehicletype=req.body.vtype
driver1.save(function(err){

if(err)
{
  res.json(err);
}
else {
  res.json({
    success:true
  });
  console.log('driver api calleds');
}

})

});


router.get('/driver', function (req, res) {
  console.log("REACHED GET DATA ON SERVER");
  driver.find({}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});

router.get('/driver/:email', function (req, res) {
  console.log("REACHED GET DATA ON SERVER"+req.params.email);
  driver.findOne({Email:req.params.email},
  function(err,docs)
  {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
     console.log(docs);
  });

});

router.put('/driver/:id', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  driver.findOneAndUpdate({_id:req.params.id},req.body, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});


router.delete('/driver/:id', function (req, res) {
  //console.log("REACHED GET DATA ON SERVER");
  driver.remove({_id:req.params.id}, function (err, docs) {
    if (err) console.log('Error at get ' + err);
    else
     res.json(docs);
    //  console.log(docs);
  });
});

 // });


module.exports = router;
