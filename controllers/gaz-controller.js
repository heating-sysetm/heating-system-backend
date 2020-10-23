const models = require("../models");

exports.getAllGaz = function () {
  return models.Gaz.findAll({
    limit: 10,
    order: [ [ 'createdAt' ]]
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

exports.addGaz = function (data) {
  models.Gaz.create({
    name: data.name,
    code: data.code,
    data: data.data
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
        return err;
    });
};