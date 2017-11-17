var mongoose=require('mongoose');

var driverSchema=mongoose.Schema({

Email:String,
Name:String,
MobileNo:String,
Usertype:String,
Address:String,
Dlnumber:String,
Vehiclename:String,
Vehiclenumber:String,
Vehiclemake:String,
Vehicletype:String



});

module.exports=mongoose.model('driver',driverSchema,'driver');
