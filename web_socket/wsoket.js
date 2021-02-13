let hc =  require("../controllers/home-controller"); 

exports.runWebSocket= function (homeList) {
  hc.getHomes().then(homelist=>{
    // console.log(homelist);
  
    if(homelist){
      homelist.forEach(home=> {
      var ws = require('./server-client');
      ws.run(home.dataValues.port,home.dataValues.url);
  });}
  });

}

