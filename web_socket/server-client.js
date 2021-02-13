var WebSocketClient = require("websocket").client;
var datareciver = require("../middleware/dataReciver");
var client = new WebSocketClient();
var connectionBot= require('./connection');
var connections = [];
var WebSocketServer = require("websocket").server;
var http = require("http");
const logger = require("../controllers/log-controller");
let isConnected = false;
let connectionList = [""];
let servers = [];

var interval = 1000;
var timechanged = false;
////////// server //////////////////////

exports.run = function (port, url) {
  var server = http.createServer(function (request, response) {
    // logger.addlog("create server",new Date() + " Received request for " + request.url);
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
      // logger.addlog("request for connection",new Date() + " Connection from origin " + request.origin + " rejected.");
      return;
    }
    if (isConnected) {
      var connection = request.accept("", request.origin);
      var cb =new connectionBot(connection,1000);
      connections.push(cb);
      cb.sendData(datareciver);
      console.log(new Date() + " Connection accepted.");


    connection.on("message", function (message) {
      if (message.type === "utf8") {
        console.log("Received Message: " + message.utf8Data);
        interval = message.utf8Data;
        // timechanged = true;
        connections.forEach((ws) => {
          var temp = ws.getConnection();
          if (temp==connection) {
            ws.changeTime(interval,datareciver);
            // ws.sendData(datareciver);
          }
        });
      } else if (message.type === "binary") {
        console.log(
          "Received Binary Message of " + message.binaryData.length + " bytes"
        );
        connection.sendBytes(message.binaryData);
      }
    });

    connection.on("close", function (reasonCode, description) {
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected."
      );
      connections.forEach((cbot) => {
        var temp = cbot.getConnection();
        if (temp==connection) {
          var index = connections.indexOf(cbot);
          cbot.stop();
          connections.splice(index,1);
          console.log('*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-',connections);
          
        }
      });
      
    });
  }
  });

  ///////////////////// client ////////////////////////////////////

  client.on("connectFailed", function (error) {
    console.log("Connect Error: " + error.toString());
  });

  client.on("connect", function (connection) {
    console.log("WebSocket Client Connected");
    isConnected=true;
    connection.on("error", function (error) {
      console.log("Connection Error: " + error.toString());
    });

    connection.on("close", function () {
      console.log("echo-protocol Connection Closed");
    });

    connection.on("message", function (message) {
      datareciver
        .saveData(message)
        .then((data) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  });

  client.connect(url, "echo-protocol");

  server.listen(port, function () {
    console.log(new Date() + " Server is listening on port " + port);
  });
  
  var timing = function () {
    console.log('+++++++++++++++++++++'+connections);
    if (connections.length > 0) {
      
      var timer = setInterval(function () {
        if (timechanged) {
          /*interval you dont want anymore or increment/decrement */
          /* Increment you do want for timer */
          clearInterval(timer);
          timing();
          timechanged = false;
        }
        
        
        datareciver.getData().then((result) => {
          connections.forEach((ws) => {
            ws.sendUTF(JSON.stringify(result));
            
          });
          console.log(interval);
          
        });
      }, interval);
    }
  };
  
};
