
var app = require('express')();
var server = app.listen(8080);
var io = require('socket.io')(server);
console.log('server listening on port 8080');

io.on('connection', (socket) => {
    console.log('a user connected');
    
    sendData(socket);

    // socket.on('esp-data', () => {
    //   console.log('data recived from esp');
    // });  

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });     
  });


  function sendData(socket){
    socket.emit('esp-data', Math.floor(Math.random() * 590)+ 10);
    setTimeout(() => {
        sendData(socket);
    }, 1000);
  }