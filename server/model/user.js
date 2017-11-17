var mongoose=require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema=mongoose.Schema({

Email:String,
Password:String,
Name:String,
MobileNo:String,
Usertype:String,
Address:String


});
//Encrypting Password

userSchema.methods.generateHash=function(password)
{
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

//Dcrypting Password
userSchema.methods.validPassword=function(password)
{
  return bcrypt.compareSync(password,this.Password);
}

module.exports = mongoose.model('User', userSchema, 'User');
