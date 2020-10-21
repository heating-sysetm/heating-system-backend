const models = require("../models");

exports.getAll = function (req, res, next) {
  res.send({ title: "Express" });
};

exports.addHome = function (req, res, next) {
  return models.Home
    .create({
      name: req.body.name,
      url: req.body.url,
    })
    .then((home) => {
      res.status(200).send({
        message: "Home created succesfully.",
        data: home,
      })
      .catch(err =>{
        res.send({
            message: "Could not create home",
            data:err
          })
      });
    });
};
