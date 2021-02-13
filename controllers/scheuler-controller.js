const models = require("../models");


//return all plans
exports.getPlans = function (req, res, next) {
  return models.Schedule.findAll()
    .then((result) => {
      res.status(200).send({
        message: "",
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not find any plan",
        data: err,
      });
    });
};


// add plan to databasse
exports.addPlan = function (req, res, next) {
  models.Schedule.create({
    startDate: req.body.start_date,
    startTime: req.body.start_time,
    endDate: req.body.end_date,
    endTime: req.body.end_time,
    status: req.body.status,
    homeId: req.body.home_id,
    boyler:req.body.boyler
  }).then(result=> {
      res.status(200).send({
        message: "plan added succesfully.",
        data: result,
      });
    })
    .catch(err=> {
      res.send({
        message: "Could not add plan",
        data: err,
      });
    });
};



// delete user from database
exports.deleteUser = function (req, res, next) {
  return models.Schedule.destroy({
    where:{
      id:req.params.plan_id
    }
  })
    .then((result) => {
      res.status(200).send({
        message: "plan deleted succesfully.",
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not delete plan",
        data: err,
      });
    });
};


// // return a user with id
// exports.findUser= function (username,pass){
//   return models.Schedule.findOne({
//     where:{
//       username:username,
//       password:pass
//     }
//   })
//   .then((result) => {
//     res.send({
//       message: "plan found succesfully.",
//       data: result,
//     });
//   })
//   .catch((err) => {
//     res.status(404).send({
//       message: "Could not find user",
//       data: err,
//     });
//   });
// }