const models = require("../models");
result = "";
exports.getAllHumidity = function () {
  return models.Humidity.findAll({
    limit: 10,
    order: [["createdAt"]],
  })
    .then((Humidity) => {
      return Humidity;
    })
    .catch((err) => {
      return err;
    });
};

exports.addHumidity = function (data) {
  console.log('addhumidity',data);
  return new Promise((resolve, reject) => {
    if (data.name & data.data) 
    {
      console.log('addhumidity',data.name);
      
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
