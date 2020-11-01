var socket = require('socket.io-client')('ws://192.168.202.199:1880/ws/publishdata');
socket.on('connect', function(){
  console.log('connected');
  
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});