
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// const validateRegister = require('../validation/doctor');
const multer = require('multer')
const mongodb = require('mongoose')
const storage = multer.diskStorage({
    destination :function(req, file , next){
 
    next( null , 'Images/Uploads/')  
    
    },
    filename : function( req , file , next){
      next(null, file.originalname)
    }
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
  

// console.log('multer' , upload)
const NewAdmin = require('../models/NewAdmin');

router.post('/register', upload.single('picture'), function (req, res) {


    
    NewAdmin.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {

            console.log("forntend data" , req.body)

            const newDoctor = new NewAdmin({
                fname: req.body.fname,
                lname: req.body.lname,
                gender: req.body.gender,
                mobile: req.body.mobile,
                role: req.body.role,
                email: req.body.email,
                picture: req.file.filename,
                password : req.body.password,
                address: req.body.address,

    
            });

        
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newDoctor.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newDoctor.password = hash;
                            newDoctor.save()
                            .then(product => {
            
                                res.status(200).json({ success: true, message: "Doctor  are  Successfully Registed", data: product })
                            })
                            .catch(error => {
                                res.status(400).json({ success: false, message: "During Registration process Error" , error
                                  })
                            })
                        }
                    });
                }
            })
           

            
        }
    });
});
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    NewAdmin.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json({ success: false, message: " Email not found" });

            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 20
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`,
                                        data: user
                                    });
                                }
                            });
                        }
                        else {
                            return res.status(400).json({ success: false, message: "Incorrect password" })
                        }
                    })
                    .catch(error =>{
                        res.status(401).json({success : false , message : 'error in login user process ', error})
                    })
                    
        });
});

router.get('/me', passport.authenticate('jwt', { session: true }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


router.get('/Get_NewAdmin',(req, res)=>{

    NewAdmin.find({})
    .exec()
    .then(doctors =>{
        res.json({ success : true , message : "All doctor Successfully fatched" , data : doctors })
        
    })
    .catch(error =>{
        res.json({success : false , message : "Fatching Doctors Error" , error}) 
    })

})



router.get('/Delete_NewAdmin/:id' , ( req,res)=>{
    var id = req.params._id

    console.log("delete id" , id)
    NewAdmin.findOneAndRemove(id)
    .exec()
    .then(doctors =>{
        //  console.log("Deleted Response from Api", doctors.data)
         res.status(200).json({success  : true , message : "Doctor are Succesfully Deleted" , data : doctors})
    })
    .catch(error =>{
        res.status(400).json({success : false , message : " Deleting process have an error" })
    })
})


  

 




  
router.post('/updatedoctor/:_id' ,( req , res)=>{
    
    var id = req.body._id
    console.log("dsdsdsdsd",id)
    Doctor.findOneAndUpdate({ _id : id} ,{
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            gender: req.body.gender,
            cnic: req.body.cnic,
            mobile: req.body.mobile,
            specil: req.body.specil,
            joinAs : req.body.joinAs,
            dateofbirth : req.body.dateofbirth,
            qualification : req.body.qualification,
            experience : req.body.experience,
            base : req.body.base,
            email: req.body.email,
            // picture: req.file.filename,
            address: req.body.address,
        }
        }
        )
    .exec()
    .then(doctors =>{
         console.log("Updated Response from Api", doctors.data)
         res.json({success  : true , message : "Doctor are successfuly Updated" , data : doctors})
    })
    .catch(error =>{
        res.json({success : false , message : " Updating process have an error", error })
    })
  //   console.log("name form frontend ", name)
  // Worker.aggregate([{$group : {Firstname : "$fname" , LastName :{ lname : "#lname" }}}])
})



module.exports = router;