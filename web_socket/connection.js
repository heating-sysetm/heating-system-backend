class ConnectionBot {
  constructor(connection, interval_time) {
    this.connection = connection;
    this.interval_time = interval_time;
    this.timer=null;
  }

  sendData = function (datareciver) {
    var cb=this.connection;
    var data_sender = function () {
        datareciver.getData().then((result) => {
            cb.send(JSON.stringify(result));
          });
    }
    this.timer = setInterval(() => {
        data_sender();
    }, this.interval_time);
    
  };



  changeTime = function (time,datareciver) {
      console.log('--------------------------',time);
      
    this.interval_time = time;
    clearInterval(this.timer);
    this.timer=null;
    console.log("------------------- time for connection changed");
    var cb=this.connection;
    var data_sender = function () {
        datareciver.getData().then((result) => {
            cb.send(JSON.stringify(result));
          });
    }
    this.timer = setInterval(() => {
        data_sender();
    }, this.interval_time);
  };

  getConnection() {
    return this.connection;
  }
  stop=function () {
    clearInterval(this.timer);
  }
}

module.exports = ConnectionBot;
