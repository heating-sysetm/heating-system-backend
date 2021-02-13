let sd = require("../controllers/sensor-value-controller");

async function addData(data) {
  let result = await sd.addSensorValue(data);
  return result;
}

async function readData() {
  let result = await sd.getSensorsValue();
  return result;
}

exports.saveData = async function (message) {
  if (message.type === "utf8") {
    data = JSON.parse(message.utf8Data);
    let result = addData(data);    
    return result;
  }
};

exports.getData = async function () {
  let result = readData();
  return result;
};
