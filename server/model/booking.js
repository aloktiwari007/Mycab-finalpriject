var mongoose=require('mongoose');
var timeZone = require('mongoose-timezone');
var bookingSchema=mongoose.Schema({

Pickuplocation:String,
Deastinationlocation:String,
Fare:Number,
Cabetype:String,
Drivername:String,
Vehiclenumber:String,
Drivermobilenumber:String,
Custname:String,
Custmobileno:String,
Bookingstatus:String,
Distance:String,
Bookingtype:String,
BookingDate:String,
PickupDate:String,
DriverBookingstatus:String,
DriverEmail:String,
CustEmail:String




});
//bookingSchema.plugin(timeZone, { paths: ['BookingDate', 'PickupDate'] });

module.exports=mongoose.model('booking',bookingSchema,'booking');
