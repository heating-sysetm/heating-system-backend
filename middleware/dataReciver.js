let temperature = require("../controllers/temperature-controller");
let gaz = require("../controllers/gaz-controller");
let humidity = require("../controllers/humidity-controller");

async function addTemp(data) {
  let result = await temperature.addTemperature(data);  
  return result;
}

exports.saveData = async function (message) {
  if (message.type === "utf8") {
    data = JSON.parse(message.utf8Data);
    let result = "";
    if (data.GasSensor_situation) {
      result = await gaz.addGaz(data.GasSensor_situation);
    } else 
    if (data.inside_situation) {
      let insideTemps = data.inside_situation;      
      insideTemps.forEach(temp => {
        result = addTemp(temp);
      }); 
    }else if (data.out_situation) {
      let outside_temps = data.out_situation;
      result = await addTemp(outside_temps[0]);
      result = await humidity.addHumidity(outside_temps[1]);
    }
    return result;
  }
};
