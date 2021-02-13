const models = require("../models");

// for websocket not http request (without any req and res)

exports.getHomes = function () {
  return new Promise((resolve, reject) => {
    models.Home.findAll()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// methods for http requests
// get list of all homes
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
  console.log('***************',req.body);
  
  models.Home.create({
    name: req.body.name,
    url: req.body.url,
    deviceCode: req.body.deviceCode,
    port: req.body.port,
    max:req.body.max
  })
    .then((home) => {
      res.status(200).send({
        message: "Home created succesfully.",
        data: home,
      });
    })
    .catch((err) => {
      console.log(err);
      
      res.send({
        message: "Could not create home",
        data: err,
      });
    });
};

exports.editHome = function (req, res, next) {
  return models.Home.update(
    {
      name: req.body.name,
      url: req.body.url,
    },
    {
      where: {
        id: req.params.home_id,
      },
    }
  )
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

exports.deleteHome = function (req, res, next) {
  models.Home.findOne({
    where: {
      id: req.params.home_id,
    },
  })
    .then((result) => {
      if (result) {
          models.Home.destroy({
          where: {
            id: req.params.home_id,
          },
        }).then((home) => {
          res.status(200).send({
            message: "Home deleted succesfully.",
            data: home,
          });
        });
      }else{
         res.status(404).send({
          message: "Home does not exist.",
          data: [],
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Could not delete home",
        data: err,
      });
    });
};
