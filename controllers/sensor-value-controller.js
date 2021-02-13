const models = require("../models");
const Sequelize = require("sequelize");
const Op = require("sequelize").Op;
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const notifc = require("./notif-controller");
const userc = require('../controllers/user-controller');
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({apikey: 'Your API Key'});
let sequelize;
let send_sms = true;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
result = "";



exports.getAllSensorValue = function () {
  return models.SensorValue.findAll({
    limit: 10,
    order: [["createdAt"]],
  })
    .then((SensorValue) => {
      return SensorValue;
    })
    .catch((err) => {
      return err;
    });
};

exports.getSensorsValue = function () {
  return models.SensorValue.findOne({
    limit: 1,
    order: [["createdAt", "DESC"]],
  })
    .then((SensorValue) => {
      return SensorValue.dataValues;
    })
    .catch((err) => {
      return err;
    });
};

exports.addSensorValue = function (data) {

  let return_data;
  let query =
    "select public.add_sensors_values('" +
    data.deviceName +
    "','" +
    data.deviceCode +
    "'," +
    `${data.outTemperature}
  ,${data.outHumidity}
  ,${data.outPutTemperature},
  ${data.inPutTemperature}
  ,${data.boiler1}
  ,${data.boiler2},
  ${data.boiler3},
  ${data.boiler4},
  ${data.cistern},
  ${data.gasSensor1},
  ${data.gasSensor2});`;

  sequelize
    .query(query)
    .then((data) => {
      var msg = "";
      return_data = JSON.parse(data[0][0].add_sensors_values);
      if (return_data.errors.length > 0) {
        if (return_data.errors[0].gas_err == 1) {
          msg =
            "درصد گاز موجود در موتورخانه به بیشترین حد خود رسیده است" +
            "\n درصد گاز :" +
            return_data.errors[0].data.gas1 +
            ", " +
            return_data.errors[0].data.gas2;
        } else if (return_data.errors[0].temp_err == 1) {
          if (return_data.errors[0].temp_err.data.boiler1) {
            msg =
              "دمای آب موتورخانه به بیشترین مقدار خود رسیده است‍‍‍‍‍‍‍‍‍\n دیگ شماره ۱ :" +
              return_data.errors[0].temp_err.data.boiler1;
          } else if (return_data.errors[0].temp_err.data.boiler2) {
            msg =
              "دمای آب موتورخانه به بیشترین مقدار خود رسیده است‍‍‍‍‍‍‍‍‍\n دیگ شماره ۱ :" +
              return_data.errors[0].temp_err.data.boiler2;
          } else if (return_data.errors[0].temp_err.data.boiler3) {
            msg =
              "دمای آب موتورخانه به بیشترین مقدار خود رسیده است‍‍‍‍‍‍‍‍‍\n دیگ شماره ۱ :" +
              return_data.errors[0].temp_err.data.boiler3;
          } else if (return_data.errors[0].temp_err.data.boiler4) {
            msg =
              "دمای آب موتورخانه به بیشترین مقدار خود رسیده است‍‍‍‍‍‍‍‍‍\n دیگ شماره ۱ :" +
              return_data.errors[0].temp_err.data.boiler4;
          }
        } else if (
          return_data.errors[0].gas_err == 1 &&
          return_data.errors[1].temp_err == 1
        ) {
          msg =
              "دمای آب و میزان گاز های اشتعال آور بیشتر از حد مجاز می باشند" +'\n دمای آب'+return_data.outPutTemperature +"\n درصد گاز :" +
              return_data.errors[0].data.gas1 +
              "%, " +"25%";
              // return_data.errors[0].data.gas2l;
        }
        if (send_sms && return_data.errors.length>0) {
          send_sms=false;
          
          notifc.addCustomNotif('هشدار',msg ,return_data.deviceCode,false);
          userc.getPhoneNumbers().then(phones=>{
            phones.forEach(element => {
              console.log('send sms to ',element.phone);
            });
          });

          setTimeout(() => {
            send_sms=true;
          }, 120000);
        }
        // notifc.addNotif(return_data.deviceCode,)
      }
      return return_data;
    })
    .catch((error) => {
      // error ...
      return error;
    });
};



exports.AllSensorsValues = function (req, res, next) {
  return models.SensorValue.findAll({
    attributes: ["cistern"],
    order: [["createdAt"]],
  })
    .then((SensorValue) => {
      res.status(200).send({
        message: "SensorValue deleted succesfully.",
        data: SensorValue,
      });
    })
    .catch((err) => {
      res.status(200).send({
        message: "SensorValue deleted succesfully.",
        data: err,
      });
    });
};

exports.getGasValues = async function (req, res, next) {
  await models.SensorValue.findAll({
    attributes: ["gasSensor1", "createdAt"],
    order: [["createdAt"]],
    where: {
      createdAt: {
        [Op.between]: [req.body.startDate, req.body.endDate],
      },
    },
    raw: true,
    limit: 100,
    order: [["createdAt", "ASC"]],
    // limit: count,
  })
    .then((result) => {
      let values = [];
      result.forEach((element) => {
        var temp = new Date(element.createdAt);
        var temp2 = new Date(temp.setHours(temp.getHours() - 5));

        values.push([temp2.getTime(), element.gasSensor1]);
      });
      res.status(200).send({
        message: "SensorValue  succesfully.",
        data: values,
      });
    })
    .catch((err) => {
      console.log(err);

      res.send({
        message: "SensorValue deleted succesfully.",
        data: err,
      });
    });
};

exports.getCisternValues = async function (req, res, next) {
  console.log(req.body.startDate, req.body.endDate, new Date());

  await models.SensorValue.findAll({
    attributes: ["cistern", "createdAt"],
    order: [["createdAt"]],
    where: {
      createdAt: {
        [Op.between]: [req.body.startDate, req.body.endDate],
      },
    },
    raw: true,
    limit: 100,
    order: [["createdAt", "ASC"]],
    // limit: count,
  })
    .then((result) => {
      let values = [];
      result.forEach((element) => {
        var temp = new Date(element.createdAt);
        var temp2 = new Date(temp.setHours(temp.getHours() - 5));

        values.push([temp2.getTime(), element.cistern]);
      });
      res.status(200).send({
        message: "SensorValue  succesfully.",
        data: values,
      });
    })
    .catch((err) => {
      console.log(err);

      res.send({
        message: "SensorValue deleted succesfully.",
        data: err,
      });
    });
};

exports.getBoylersValues = async function (req, res, next) {
  console.log(req.body.startDate, req.body.endDate, new Date());

  await models.SensorValue.findAll({
    attributes: ["boiler1", "boiler2", "boiler3", "boiler4", "createdAt"],
    order: [["createdAt"]],
    where: {
      createdAt: {
        [Op.between]: [req.body.startDate, req.body.endDate],
      },
    },
    raw: true,
    limit: 100,
    order: [["createdAt", "ASC"]],
    // limit: count,
  })
    .then((result) => {
      let values = { boiler1: [], boiler2: [], boiler3: [], boiler4: [] };
      var temp;
      var temp2;
      result.forEach((element) => {
        temp = new Date(element.createdAt);
        temp2 = new Date(temp.setHours(temp.getHours() - 5));
        values.boiler1.push([temp2.getTime(), element.boiler1]);
        values.boiler2.push([temp2.getTime(), element.boiler2]);
        values.boiler3.push([temp2.getTime(), element.boiler3]);
        if (element.boiler4) {
          values.boiler4.push([temp2.getTime(), element.boiler4]);
        }
      });
      res.status(200).send({
        message: "SensorValue  succesfully.",
        data: values,
      });
    })
    .catch((err) => {
      console.log(err);

      res.send({
        message: "SensorValue deleted succesfully.",
        data: err,
      });
    });
};

exports.getInOutValues = async function (req, res, next) {
  console.log(req.body.startDate, req.body.endDate, new Date());

  await models.SensorValue.findAll({
    attributes: ["outPutTemperature", "inPutTemperature", "createdAt"],
    order: [["createdAt"]],
    where: {
      createdAt: {
        [Op.between]: [req.body.startDate, req.body.endDate],
      },
    },
    raw: true,
    limit: 100,
    order: [["createdAt", "ASC"]],
    // limit: count,
  })
    .then((result) => {
      let values = [];
      let values2 = [];
      result.forEach((element) => {
        var temp = new Date(element.createdAt);
        var temp2 = new Date(temp.setHours(temp.getHours() - 5));

        values.push([temp2.getTime(), element.outPutTemperature]);
        values2.push([temp2.getTime(), element.inPutTemperature]);
      });
      res.status(200).send({
        message: "SensorValue  succesfully.",
        data: { data1: values, data2: values2 },
      });
    })
    .catch((err) => {
      console.log(err);

      res.send({
        message: "SensorValue deleted succesfully.",
        data: err,
      });
    });
};
