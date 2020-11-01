let temperature = require("../controllers/temperature-controller.js");
let gaz = require("../controllers/gaz-controller.js");


async function addTemp(data){
  let result='';
  data.forEach(temp => {
     result =temperature.addTemperature(data);
   });
   return result;
}

exports.saveData = async function (message) {
  if (message.type === "utf8") {
    data = JSON.parse(message.utf8Data);
    let result='';
    if(data.GasSensor_situation){
      result = await gaz.addGaz(data.GasSensor_situation);
    }else if (data.inside_situation) {
        let insideTemps = data.inside_situation;
        result=await addTemp(insideTemps);
    } else if(data.out_situation){
      let outside_temps=data.out_situation;
      outside_temps.forEach(temp =>{
        // result = await temperature.addTemperature(data);
        console.log('outside temp added');
        
      });
    }
    return result;
  }
};



