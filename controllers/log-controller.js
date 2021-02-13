const models = require("../models");

exports.getAllLogs = function (req, res, next) {
  return models.Log.findAll()
    .then((result) => {
      res.status(200).send({
        message: "all logs",
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not find any alert",
        data: err,
      });
    });
};

exports.addlog = function (title,data) {
  models.Log.create({
    title: title,
    data: data,
  })
    .then()
    .catch((err) => {
      console.log(err);  
    });
};


// exports.deleteAlert = function (req, res, next) {
//   return models.Log.destroy({
//     where:{
//       id:req.params.log_id
//     }
//   })
//     .then((result) => {
//       res.status(200).send({
//         message: "log deleted succesfully.",
//         data: result,
//       });
//     })
//     .catch((err) => {
//       res.send({
//         message: "Could not delete home",
//         data: err,
//       });
//     });
// };
