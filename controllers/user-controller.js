const models = require("../models");

exports.getUsers = function (req, res, next) {
  return models.User.findAll()
    .then((users) => {
      res.status(200).send({
        message: "",
        data: users,
      });
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not find any user",
        data: err,
      });
    });
};

exports.addUser = function (req, res, next) {
  models.User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    isAdmin: false
  }).then(result=> {
      console.log('++',result);
      res.send({
        message: "User added succesfully.",
        data: result,
      });
    })
    .catch(err=> {
      console.log('--',err);
      res.send({
        message: "Could not add user",
        data: err,
      });
    });
};

exports.editUser = function (req, res, next) {
  return models.User.update({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    isAdmin: false
  },{
    where:{
      id:req.params.user_id
    }
  })
    .then((res) => {
      res.status(200).send({
        message: "user updated succesfully.",
        data: res,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not update user",
        data: err,
      });
    });
};

exports.deleteUser = function (req, res, next) {
  return models.User.destroy({
    where:{
      id:req.params.user_id
    }
  })
    .then((res) => {
      res.status(200).send({
        message: "user deleted succesfully.",
        data: res,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not delete user",
        data: err,
      });
    });
};

exports.findUser= function (username,pass){
  return models.User.findOne({
    where:{
      username:username,
      password:pass
    }
  })
    .then((res) => {      
        return res;
    })
    .catch((err) => {
      return err;
    });
}