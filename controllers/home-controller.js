const models = require("../models");

exports.getAll = function (req, res, next) {
  return models.Home.findAll()
    .then((homes) => {
      res.status(200).send({
        message: "",
        data: homes,
      });
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not find any homes",
        data: err,
      });
    });
};

exports.addHome = function (req, res, next) {
  models.Home.create({
    name: req.body.name,
    url: req.body.url,
  })
    .then((home) => {
      res.status(200).send({
        message: "Home created succesfully.",
        data: home,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not create home",
        data: err,
      });
    });
};

exports.editHome = function (req, res, next) {
  return models.Home.update({
    name: req.body.name,
    url:req.body.url
  },{
    where:{
      id:req.params.home_id
    }
  })
    .then((home) => {
      res.status(200).send({
        message: "Home updated succesfully.",
        data: home,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not update home",
        data: err,
      });
    });
};
