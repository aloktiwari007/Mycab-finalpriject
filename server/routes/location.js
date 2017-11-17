var express=require('express');
var multer=require('multer');
var router=express.Router();
var location=require('../model/location.js');


router.post('/location',function(req,res){



console.log(req.body);
var location1=new location();

location1.Email:String,
location1.lat:Number,
location1.lng:Number


location1.save(function(err){

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
