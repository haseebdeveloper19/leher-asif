const express = require('express');
const router = express.Router();
const Email = require('../models/Email')
router.post('/register', function (req, res) {


   
            const newUser = new Email({
                name: req.body.name,
                email: req.body.email,
                subject: req.body.subject,
                message : req.body.message,

            });

            newUser
            .save()
            .then(email => {
                res.status(200).json({ status : true , message : " Email are succesfully added " , data : email })
            })
            .catch(err => {
                res.status(400).json({ status : false , message : " Email are not  added " , err })
                 
            })

            

            
});








router.get('/Get_Email', (req, res) => {
    Email.find({})
        .exec()
        .then(user => {
            res.status(200).json({ success: true, message: "All User are Fetched", data: user })
        })
        .catch(error => {
            res.status(400).json({ success: false, message: "All User are not  Fetched", error })

        })

})



module.exports = router;