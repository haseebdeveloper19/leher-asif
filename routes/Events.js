const express = require('express');
const router = express.Router();
const Event = require('../models/Events')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'Images/Uploads')
    },
    filename: function (req, file, next) {
        next(null, file.originalname)
    },
})

const fileFilter = (req, file, next) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

        next(null, true)
    }
    else {
        next(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.post('/register', upload.single('picture'), (req, res) => {
    console.log(req.body)
    Event.findOne({
        event_date: req.body.date
    }).then(user => {
        if (user) {
            return res.status(400).json({
                success: false, message: 'Email already exists'
            });
        }
        else {

            let NewProduct = new Event({
                event_date: req.body.date,
                eventname: req.body.eventName,
                discount: req.body.discount,
                // picture: req.file.filename,
            })
            NewProduct.save()
                .then(product => {

                    res.json({ success: true, message: " Secilist Doctor Appointments  are  Successfully Registed", data: product })
                })
                .catch(error => {
                    res.json({
                        success: false, message: "During Registration process Error", error
                    })
                })
            }

        })

})




router.post('/eventDate', (req, res) => {
    var id = req.body.id;
    Event.findByIdAndUpdate({ _id: id }, {
      $set: {
       status : req.body.status
      }
    })
      .exec()
      .then(product => {
        if (!product) {
          res.status(404).json({ success: false, Error: 'Product not found for this id' })
        }
        res.status(200).json({ success: true, message: 'Product update' })
  
      })
      .catch(err => {
        console.log('Product update Error: ', err)
      })
  })


router.get('/Get_Event' ,(req, res) => {
    Event.find({})
       .exec()
       .then(Salary => {

           res.json({ success: true, message: "All salary Successfully fatched", data: Salary })
       })
       .catch(error => {
           res.json({ success: false, message: "Fatching Salary Error", error })
       })

})

module.exports = router