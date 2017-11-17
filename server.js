var logger = require('morgan');
var express = require('express');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var bodyParser = require('body-parser');
var path = require('path');
var registerroute = require('./server/routes/register.js');
var driverroute = require('./server/routes/driver.js');
var driverhomeroute = require('./server/routes/driverhome.js');
var tariffroute = require('./server/routes/tariff.js');
var bookingroute = require('./server/routes/booking.js');
var app = express();

//---------------socket--------------------------


app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './client')));

// var dbMac = 'DESKTOP-D0F91VF';
var dbMac = '127.0.0.1';
var dbHost = 'mongodb://' + dbMac + ':27017/Cabbooking';

mongoose.connect(dbHost);
var db = mongoose.connection;

db.on('open', function () {
    console.log('App is connected to database');
});

db.on('error', function (err) {
    console.log(err);
});

app.use('/api',registerroute);
app.use('/api',driverroute);
app.use('/api',driverroute);
app.use('/api',tariffroute);
app.use('/api',bookingroute);
app.use(logger("dev"));

//
// var routes = require('./server/routes');
// routes(app);
// app.get('/public/js/*', function (req, res) {
//     var path = req.params[0];
//     // Don't let them peek at .. folder
//     if (path.indexOf('..') === -1) {
//         return res.sendFile(__dirname + '/client/public/js/' + path);
//     } else {
//         res.status = 404;
//         return res.send('Not Found');
//     }
// });
//
// app.get('/public/css/*', function (req, res) {
//     var path = req.params[0];
//     // Don't let them peek at .. folder
//     if (path.indexOf('..') === -1) {
//         return res.sendFile(__dirname + '/client/public/css/' + path);
//     } else {
//         res.status = 404;
//         return res.send('Not Found');
//     }
// });

 //
  app = require('http').Server(app);
 // console.log(server.port);
var io = require('socket.io')(app);

io.set('heartbeat timeout', 2000);
io.set('heartbeat interval', 500);

io.on('connection', function (socket) {

  // socket.on('news',function(data){
  //
  //   console.log(data);
  // });
  // socket.on('my other event', function (data) {
  //
  //   console.log(data);
  // });
  //socket.emit('my other event', {hhh:'asdf'});
  socket.on('my other event', function (data1) {
  //  console.log(data1);
    socket.broadcast.emit('my other event', {lat:data1.lat,lng:data1.lng,Email:data1.Email});
  });

  socket.on('client', function (data1) {
    console.log(data1.vnumber);
    socket.broadcast.emit('client', {cname :data1.cname,cmobile:data1.cmobile,pickuplocation:data1.pickuplocation,destination:data1.destination,vnumber:data1.vnumber});
  });
  //console.log(data1);
  socket.on('disconnect', function(data1){
          console.log('user disconnected');
           socket.broadcast.emit('noclient', {hhh:'dis'});
      });



});





//server.listen(5000);
app.listen(8080, function (req, res) {
    console.log('Server is running on http://localhost:8080');
});
