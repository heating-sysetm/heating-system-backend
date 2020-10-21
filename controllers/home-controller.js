const models = require("../models");

exports.getAll = function (req, res, next) {
    models.Home.findAll().then(
        (homes)=>{
            res.status(200).send({
                message: "",
                data: homes
            });
        }
    )
    .catch((err)=>{
        res.status(200).send({
            message: "Could not find any homes",
            data: err
        });
        }
    );
};

exports.addHome = function (req, res, next) {
  models.Home
    .create({
      name: req.body.name,
      url: req.body.url,
    })
    .then((home) => {
      res.status(200).send({
        message: "Home created succesfully.",
        data: home,
      })
    })
    .catch(err =>{
        res.send({
            message: "Could not create home",
            data:err
          })
      });
};
