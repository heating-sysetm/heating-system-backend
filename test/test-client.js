var WebSocketClient = require('websocket').client;
// let server = require('./server.js');
// let datareciver = require('../middleware/dataReciver');
 
var client = new WebSocketClient();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    let data=connection.on('message', function (message) {
        if (message.type === "utf8") {
          console.log('+++++ recived from node server');
          console.log(message); 
        }});
    
    
    
    
});
 
client.connect('http://localhost:8070', 'echo-protocol');

