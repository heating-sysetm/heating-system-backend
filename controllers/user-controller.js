const models = require("../models");
const logger = require("./log-controller");
logger.addlog("getUsers","return all users with 200 status");


//return all users
exports.getUsers = function (req, res, next) {
  return models.User.findAll()
    .then((users) => {
      res.status(200).send({
        message: "",
        data: users,
      });
      logger.addlog("getUsers","return all users with 200 status");
    })
    .catch((err) => {
      res.send({
        message: "Could not find any user",
        data: err,
      });
      logger.addlog("getUsers"," return all users failed.");
    });
};

//get supervisers
exports.getSupervisors = function (req, res, next) {
   models.User.findAll({
    where:{
      sendSMS:true
    }
  })
    .then((users) => {
      res.status(200).send({
        message: "",
        data: users,
      });
      logger.addlog("getUsers","return all users with 200 status");
    })
    .catch((err) => {
      res.send({
        message: "Could not find any user",
        data: err,
      });
      logger.addlog("getUsers"," return all users failed.");
    });
};

exports.getPhoneNumbers=function(){
  return models.User.findAll({
    attributes:["phone"],
    where:{
      sendSMS:true
    }
  })
    .then((users) => {
      logger.addlog("getUsers","return all users with 200 status");
      var list=[];
      users.forEach(element => {
        list.push(element.dataValues)
      });
      return list;
    })
    .catch((err) => {
      logger.addlog("getUsers"," return all users failed.");
    });
}

// add user to databasse
exports.addUser = function (req, res, next) {
  models.User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    sendSMS:req.body.sendSMS,
    phone: req.body.phone
  }).then(result=> {
      res.send({
        message: "User added succesfully.",
        data: result,
      });
      logger.addlog("addUser","add user with 200 status");
    })
    .catch(err=> {
      res.status(400).send(err);
      logger.addlog("addUser","add user failed");
    });
};


// edit user attr
exports.editUser = function (req, res, next) {
  return models.User.update({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    sendSMS:req.body.sendSMS,
    phone:req.body.phone
  },{
    where:{
      id:req.params.user_id
    }
  })
    .then((result) => {
      res.status(200).send({
        message: "user updated succesfully.",
        data: result,
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: "Could not update user",
        data: err,
      });
      console.log(err);
      
    });
};


// delete user from database
exports.deleteUser = function (req, res, next) {
  return models.User.destroy({
    where:{
      id:req.params.user_id
    }
  })
    .then((result) => {
      res.send({
        message: "user deleted succesfully.",
        data: result,
      });

      logger.addlog("addUser","add user with 200 status");
    })
    .catch((err) => {
      res.status(404).send({
        message: "Could not delete user",
        data: err,
      });
    });
};


// return a user with id
exports.findUser= function (username,pass){
  return models.User.findOne({
    where:{
      username:username,
      password:pass
    }
  })
  .then((result) => {
    res.send({
      message: "user found succesfully.",
      data: result,
    });
  })
  .catch((err) => {
    res.status(404).send({
      message: "Could not find user",
      data: err,
    });
  });
}