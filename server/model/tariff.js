var mongoose=require('mongoose');

var tariffSchema=mongoose.Schema({

Startpeakhour:String,
Endpeakhour:String,
Peakrate:Number,
Normalrate:Number,
Cabtype:String




});

module.exports=mongoose.model('tariff',tariffSchema,'tariff');
