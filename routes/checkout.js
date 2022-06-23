
const express = require('express');
const router = express.Router();
// const stripe = require('stripe')('sk_test_jA1Pk82NYeG6ESOapfteCFS600V3ZGZxUm')
const Checkout = require('../models/Checkout');
const gravatar = require('gravatar');
const Notification = require('../models/Notification')
// const Cart = require('../models/Cart')
router.post('/Payment', function (req, res) {


  try {
    
    let unique = Math.floor(Math.random() * Date.now())
    
  const Newcheckout  = new Checkout({
    customer_id: unique,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    mobile: req.body.mobile,
    state: req.body.country,
    city: req.body.city,
    zipcode : req.body.zipcode,
    address: req.body.address,
    products: req.body.products,
    quantity: req.body.quantity,
    amount: req.body.amount,
    
    
  })

  const avatar = gravatar.url(req.body.email, {
    s: '200',
    r: 'pg',
    d: 'mm'
}); 
      const notifi = new Notification({
        IsNotification : true,
        name: req.body.fname + req.body.lname,
        customer_id: unique,
        email: req.body.email,
        picture : avatar
    
    })
    //  const cart = new Cart({
    //   products: req.body.products,
    
    //  })

   
   Newcheckout.save()
   notifi.save()
    // cart.save()
   .then(staff => {
        res.status(200).json({
          success: true, message: " Product Register process Success", data: staff
        })
      })
      .catch(error => {
        res.status(400).json({
          success: false, message: " Product Register process error", error
        })
      })
    } catch (err) {
      res.send(err);
    }


  
});





router.get('/clientinfo/:id', (req, res) => {
  var id = req.params.id

  console.log("delete id", id)
  Checkout.find({ customer_id : id})
    .exec()
    .then(doctors => {
      res.json({ success: true, message: "Doctor are Succesfully Deleted", data: doctors })
    })
    .catch(error => {
      res.json({ success: false, message: " Deleting process have an error", error })
    })
})



router.get('/getCheckout', (req, res) => {
 
 Checkout.find({})
    .exec()
    .then(doctors => {
      res.json({ success: true, message: "Doctor are Succesfully Deleted", data: doctors })
    })
    .catch(error => {
      res.json({ success: false, message: " Deleting process have an error", error })
    })
})












module.exports = router;
