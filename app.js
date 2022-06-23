const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./Config/db');
// const socketio = require('socket.io')
const http = require('http')





const User = require('./routes/user');
const admins = require('./routes/admin');
const product = require('./routes/product');
const cart = require('./routes/Cart');
const slider = require('./routes/Slider')
const NewAdmin = require('./routes/NewAdmin')
const checkout = require('./routes/checkout')
const event = require('./routes/Events')
const Email = require('./routes/Email')
const notification = require('./routes/Notification')



// const { errorMonitor } = require('stream');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();
const server = http.createServer(app)
// const io = socketio(server)
app.use(passport.initialize());
require('./Config/passport')(passport);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
    return res.status(200).json({})
  }
  next()
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static(__dirname + '/Images/Uploads'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));



app.get("*", (req, res) => {
  res.sendFile(__dirname, "client/build/index.html");
})


}




app.use('/api/users', User);
app.use('/api/admins', admins);
app.use('/api/product', product)
app.use('/api/cart', cart)
app.use('/api/checkout', checkout)
app.use('/api/banner', slider)
app.use('/api/newAdmin', NewAdmin)
app.use('/api/event', event)
app.use('/api/email' , Email)
app.use('/api/notification', notification)



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use((req, res , next) =>{
    const error = new Error("Not Found");
    error.status = 400;
    next(error)
})

app.use((error , req ,res , next) =>{
    res.status(error.status || 500);
    res.send({
        error :{
         status : errorMonitor.status || 500 , 
         message : error.message || "Internal  Server Error"
        }
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});