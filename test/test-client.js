const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:7070");

ioClient.on("temp-data", (msg) => console.info(msg));
