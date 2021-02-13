const models = require("../models");

exports.getAllNotifs = function (req, res, next) {
  return models.Notif.findAll()
    .then((result) => {
      res.status(200).send({
        message: "all Notifs",
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not find any Notif",
        data: err,
      });
    });
};

exports.getNotifs = function (req, res, next) {
  return models.Notif.findAll({
    where:{
      isRead:false
    }
  })
    .then((result) => {
      res.status(200).send({
        message: "all Notifs",
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not find any Notif",
        data: err,
      });
    });
};
exports.addCustomNotif = function (title,message,deviceCode,is_read) {
  models.Notif.create({
    title: title,
    msg:message,
    homeId:deviceCode,
    isRead:is_read
  })
    .then((home) => {
    })
    .catch((err) => {

    });
};


exports.addNotif = function (req,res,next) {
  models.Notif.create({
    title: req.body.title,
    msg: req.body.msg,
    homeId: req.body.deviceCode,
    isRead: req.body.is_read
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.editNotif = function (req, res, next) {
  return models.Notif.update({
      isRead:true
  },{
    where:{
      id:req.params.notif_id
    }
  })
    .then((result) => {
      res.status(200).send({
        message: "Notif edited succesfully.",
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not edited notif",
        data: err,
      });
    });
};



exports.deleteNotif = function (req, res, next) {
  return models.Notif.destroy({
    where:{
      id:req.params.notif_id
    }
  })
    .then((home) => {
      res.status(200).send({
        message: "Notif deleted succesfully.",
        data: home,
      });
    })
    .catch((err) => {
      res.send({
        message: "Could not delete home",
        data: err,
      });
    });
};
