const express = require('express')
const router = express.Router();
const Notification = require('../models/Notification');


router.get('/getNotification', (req, res) => {
    Notification.find({})
      .exec()
      .then(user => {
  
        res.json({ success: true, message: " Fetch Staffs Successfully", data: user })
      })
      .catch(err => {
        res.json({ success: false, message: "error are during Fetch Staff", err })
      })
  })

  router.post('/HideNotifi', (req, res) => {
    console.log("rererer")
    Notification.updateMany({},
      {
        $set: {
          IsNotification: false
          
        }
      })
      .exec()
      .then(user => {
  
        res.json({ success: true, message: " Fetch Staffs Successfully", data: user })
      })
      .catch(err => {
        res.json({ success: false, message: "error are during Fetch Staff", err })
      })
  })


  

//   Notification.aggregate([{
//     $addFields: {
//         /** converting month from string to num :: Dec to 12 & extracting date & year from string */
//         month: {
//             $indexOfArray: [[, "Jan", "Feb", "Mar", "Aprl", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
//                 , { $arrayElemAt: [{ $split: ['$db_date', " "] }, 1] }]
//         }
//         , date: { $toInt: { $arrayElemAt: [{ $split: ['$db_date', " "] }, 0] } }, year: { $toInt: { $arrayElemAt: [{ $split: ['$db_date', " "] }, 2] } }
//     }
// }, {
//     /** db_date is being converted to format ISODate() from parts year + month + day & then to this : "2019-12-18" */
//     $addFields: {
//         db_date: {
//             $dateToString: {
//                 format: "%Y-%m-%d", date: {
//                     $dateFromParts: {
//                         'year': '$year', 'month': '$month', 'day': '$date'
//                     }
//                 }
//             }
//         }
//     }
// }, { $project: { 'month': 0, 'year': 0, 'date': 0 } },
// {
//     /** Here we're converting ISODate() from input to like this : "2019-12-19", This is what you actually asked for */
//     $match: {
//         $expr: {
//             $eq: ['$db_date', {
//                 $dateToString: {
//                     format: "%Y-%m-%d", date: new Date()
//                 }
//             }]
//         }
//     }
// }
// ])
// });



  
  
  module.exports = router