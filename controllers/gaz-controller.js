const models = require("../models");

exports.getAllGaz = function () {
  return models.Gaz.findAll({
    limit: 10,
    order: [["createdAt"]],
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

exports.addGaz = function (data) {
  return new Promise((resolve, reject) => {
    models.Gaz.create({
      name: data.name,
      code: "101",
      data: data.data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
