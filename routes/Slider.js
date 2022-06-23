const express = require('express')
const router = express.Router();
// const validateRegister = require('../validation/WorkerVali')
const multer = require('multer')
const Slider = require('../models/Slider')

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'Images/Uploads')
    },
    filename: function (req, file, next) {
      next(null , file.originalname)
    },
})

const fileFilter =(req, file , next) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      
      next(null , true)
    }
    else {
      next(null , false)
    }
    }
    
    const upload = multer({
      storage : storage , 
      limits :{
      fileSize : 1024 * 1024 * 5
    },
      fileFilter : fileFilter
    })

    router.post('/register', upload.any(),  (req, res) => {
      let picture =[];
      req.files.forEach(file => {
        picture.push(file.filename)
        
      });
     
            const NewProduct  = new Slider({
              title1: req.body.Title1,
              title2: req.body.Title2,
              title3: req.body.Title3,
              title4: req.body.Title4,
              desc1: req.body.desc1,
              desc2: req.body.desc2,
              desc3 : req.body.desc3,
              desc4 :req.body.desc4,
              picture: picture,
  
         })
  
            NewProduct.save()
              .then(staff => {
    
              })
              .catch(error => {
                res.status(400).json({
                  success: false, message: " Product Register process error", error
                })
              })
    
    
    })
    
    
    router.get('/getSlider',  (req, res) => {
      Slider.find()
        .exec()
        .then(user => {
             
          res.json({ success: true, message: " Fetch Staffs Successfully", data: user })
        })
        .catch(err => {
          res.json({ success: false, message: "error are during Fetch Staff", err })
        })
    })




router.get('/delSlider/:id' , ( req,res)=>{
  var id = req.params.id


  Slider.findByIdAndRemove(id)
  .exec()
  .then(worker =>{
       res.json({success  : true , message : "Doctor are Succesfully Deleted" , data : worker})
  })
  .catch(error =>{
      res.json({success : false , message : " Deleting process have an error" })
  })
})


router.post('/updateworker/:id',(req, res)=>{

  var id = req.body._id
  Worker.findOneAndUpdate({ _id : id } , 
    {
      $set:{
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        cnic: req.body.cnic,
        mobile: req.body.mobile,
        specilist: req.body.specilist,
        dateofbirth : req.body.dateofbirth,
        status : req.body.status,
        // picture: req.file.path,
        address: req.body.address,
      }
    })
    .exec()
    .then(worker =>{
      res.json({success : true , message: " worker are successfully updated", data : worker})
    })
    .catch(err =>{
      res.json({success : false , message : "error are occure during worker updated", err})
    })
})

module.exports = router