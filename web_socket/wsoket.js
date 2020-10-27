const io = require("socket.io-client"),
  ioClient = io.connect("http://localhost:8080"),
  app = require("express")(),
  server = app.listen(7070),
  ioServer = require("socket.io")(server);

  exports.run=function(){
    ioServer.on("connection", (socket) => {
      console.log("a user connected");
    
      ioClient.on("esp-data", (msg) => {
        socket.emit('temp-data',msg);
      });
    
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }



