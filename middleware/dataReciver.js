let temperature = require("../controllers/temperature-controller.js");
let gaz = require("../controllers/gaz-controller.js");

exports.saveData = async function (message) {
  if (message.type === "utf8") {
    data = JSON.parse(message.utf8Data);
    console.log("---- recived from esp ---------");
    
    let result =await temperature.addTemperature(data);
    return result;
  }
};
