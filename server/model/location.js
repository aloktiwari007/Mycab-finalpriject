var mongoose=require('mongoose');

var locationSchema=mongoose.Schema({

Email:String,
lat:Number,
lng:Number





});

module.exports=mongoose.model('location',locationSchema,'location');
