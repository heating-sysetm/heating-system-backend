var WebSocketClient = require("websocket").client;
var datareciver = require("../middleware/dataReciver");
var client = new WebSocketClient();
var connections = [];
var WebSocketServer = require("websocket").server;
var http = require("http");
let isConnected = false;

////////// server //////////////////////

var server = http.createServer(function (request, response) {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});

wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  // var originList =["http://localhost:4200"]
  // if(originList.includes(origin)){
  //   return false;
  // }
  return true;
}

wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  var connection2 = request.accept("",request.origin);
  connections.push(connection2);
  console.log(new Date() + " Connection accepted.");

  connection2.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      connection2.sendUTF(message.utf8Data);
    } else if (message.type === "binary") {
      console.log(
        "Received Binary Message of " + message.binaryData.length + " bytes"
      );
      connection2.sendBytes(message.binaryData);
    }
  });
  
  connection2.on("close", function (reasonCode, description) {
    console.log(
      new Date() + " Peer " + connection2.remoteAddress + " disconnected."
    );
  });
});

///////////////////// client ////////////////////////////////////

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
    console.log('++++++++++++++++',message);
    
    datareciver
      .saveData(message)
      .then((data) => {
        // connections.forEach((ws) => {
        //   ws.send(JSON.stringify(message));
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});




client.connect("ws://192.168.202.199:1880/ws/publishData", "echo-protocol");

server.listen(8070, function () {
  console.log(new Date() + " Server is listening on port 8070");
});


// exports.runWebSocket = function () {

// };
