

var WebSocketClient = require("websocket").client;
var datareciver = require("../middleware/dataReciver");
var client = new WebSocketClient();
var connections = [];
var WebSocketServer = require("websocket").server;
var http = require("http");
const logger = require("../controllers/log-controller");
let isConnected = false;
let connectionList=['']
let servers=[];

////////// server //////////////////////

// exports.run=function(port , url){

// var server = http.createServer(function (request, response) {
//   // logger.addlog("create server",new Date() + " Received request for " + request.url);
//   console.log(new Date() + " Received request for " + request.url);
  
//   response.writeHead(404);
//   response.end();
// });
// wsServer = new WebSocketServer({
//   httpServer: server,
//   // You should not use autoAcceptConnections for production
//   // applications, as it defeats all standard cross-origin protection
//   // facilities built into the protocol and the browser.  You should
//   // *always* verify the connection's origin and decide whether or not
//   // to accept it.
//   autoAcceptConnections: false,
// });

// function originIsAllowed(origin) {
//   // put logic here to detect whether the specified origin is allowed.
//   // var originList =["http://localhost:4200"]
//   // if(originList.includes(origin)){
//   //   return false;
//   // }
//   return true;
// }

// wsServer.on("request", function (request) {
//   if (!originIsAllowed(request.origin)) {
//     // Make sure we only accept requests from an allowed origin
//     request.reject();
//     console.log(
//       new Date() + " Connection from origin " + request.origin + " rejected."
//     );
//     // logger.addlog("request for connection",new Date() + " Connection from origin " + request.origin + " rejected.");
//     return;
//   }

//   var connection = request.accept("",request.origin);
//   connections.push(connection);
//   console.log(new Date() + " Connection accepted.");

//   connection.on("message", function (message) {
//     if (message.type === "utf8") {
//       console.log("Received Message: " + message.utf8Data);
//       connection.sendUTF(message.utf8Data);
//     } else if (message.type === "binary") {
//       console.log(
//         "Received Binary Message of " + message.binaryData.length + " bytes"
//       );
//       connection.sendBytes(message.binaryData);
//     }
//   });
  
//   connection.on("close", function (reasonCode, description) {
//     console.log(
//       new Date() + " Peer " + connection.remoteAddress + " disconnected."
//     );
//   });
// });

///////////////////// client ////////////////////////////////////


// server.listen(port, function () {
//   console.log(new Date() + " Server is listening on port 8070");
// });
// };


client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", function (connection) {
  console.log("WebSocket Client Connected");
  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });

  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
  });

  connection.on("message", function (message) {
    console.log(message);
    // let data = JSON.parse(message.utf8Data);

    // datareciver
    //   .saveData(message)
    //   .then((data) => {
        // connections.forEach((ws) => {
        //   ws.send(JSON.stringify(message));
        // });
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  });

});
// console.log('++++++++',url);


// client.connect(url, 'echo-protocol');
// client.connect("ws://192.168.202.199:1880/ws/publishData");
client.connect("http://localhost:8070",'echo-protocol');
