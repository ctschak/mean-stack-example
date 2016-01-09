var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var UserSchema = new mongoose.Schema({
  username: {type:String,lowercase:true, unique:true},
  password: {type:String,lowercase:true},
  hash:String,
  salt:String
});

UserSchema.methods.setPassword = function(password){
  //this.salt = crypto.randomBytes(16).toString('hex');
  this.salt = crypto.randomBytes(16).toString('base64');
//  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  var buffSalt = new Buffer('test123123');
  this.hash = crypto.pbkdf2Sync(password,buffSalt, 10000, 64).toString('base64');
};

UserSchema.methods.validPassword = function(password){

//  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
//  var hash = crypto.pbkdf2Sync(new Buffer(password, 'binary'), this.salt, 1000, 64).toString('hex');
console.log("Inside UserSchema -- "+ password);
  var buffSalt = new Buffer('test123123');
  var hash = crypto.pbkdf2Sync(password, buffSalt, 10000, 64).toString('base64');
  console.log("Inside UserSchema hash-- "+ hash);
  console.log("Inside UserSchema this.hash -- "+ this.hash );
  console.log("Inside UserSchema this.password -- "+ this.password );
//  return this.hash === hash;
  return this.password === password;
};

UserSchema.methods.generateJWT = function(){

  //set password expiration to 60 days.
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id : this._id,
    username : this.username,
    exp: parseInt(exp.getTime()/1000)
  },'SECRET');

};

mongoose.model('User', UserSchema);
