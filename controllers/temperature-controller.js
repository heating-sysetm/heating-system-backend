const models = require("../models");
result = "";
exports.getAllTemperature = function () {
  return models.Temperature.findAll({
    limit: 10,
    order: [["createdAt"]],
  })
    .then((Temperature) => {
      return Temperature;
    })
    .catch((err) => {
      return err;
    });
};

exports.addTemperature = function (data) {
  return new Promise((resolve, reject) => {
    if (data.name & data.data) {
      models.Temperature.create({
        name: data.name,
        code: "202",
        data: data.data,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

// exports.deleteTemperature = function (req, res, next) {
//   return models.Temperature.destroy({
//     where:{
//       id:req.params.Temperature_id
//     }
//   })
//     .then((res) => {
//       res.status(200).send({
//         message: "Temperature deleted succesfully.",
//         data: res,
//       });
//     })
//     .catch((err) => {
//       res.send({
//         message: "Could not delete Temperature",
//         data: err,
//       });
//     });
// };
