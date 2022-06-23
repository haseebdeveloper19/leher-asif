const express = require('express')
const router = express.Router();
const validateRegister = require('../validation/AnnounceVali')
const multer = require('multer')
const Announce = require('../models/Announce')




router.post('/register' ,(req,res) =>{
         console.log(req.body)
    const { errors , isValid } = validateRegister(req.body);
     
    if(!isValid)
    {
        return res.status(400).json(errors)
    }

       const announce = new Announce({
        tittle: req.body.tittle,
        sendto: req.body.sendto,
        date: req.body.date,
        desc: req.body.desc,
     
       }) 
       announce.save()
       .then(anno =>{
           res.status(200).json({success : true , message : " Announcement process Successfully Completed" , data : anno})
       })
       .catch(error =>{
           res.status(400).json({success : false , message : " Announce Register process error", error
           })
          })

})


router.get('/Get_Announce',(req,res)=>{
  Announce.find({})
  .exec()
  .then(user =>{
    res.json({success : true , message : " Fetch Announcement Successfully", data : user })
  })
  .catch(err=>{
    res.json({success : false , message : "error are during Fetch Announcement" , err})
  })
})

router.get('/Delete_Announce/:_id',(req , res)=>{
  Announce.findByIdAndRemove({ id : req.params.id})
  .exec()
  .then(user =>{
    res.json({ success : true , message : " Announcement are successfully Deleted", user
    })
  })
  .catch(err =>{
    res.json({ success : false , message : " During Announcement  Deletion Process Fail" , err})
})
})

module.exports = router