const users = require("../controllers/user-controller");
const jwt = require("jsonwebtoken");

exports.ensureToken = function (req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  // console.log(typeof authHeader == "undefined");
  if (typeof authHeader == "undefined") return res.sendStatus(401);
  
  
  const token = authHeader.split(" ")[1];

  if (token == "") return res.sendStatus(401); // if there isn't any token
  jwt.verify(token, "SECRET", (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);
    next(); // pass the execution off to whatever request the client intended
  });
};

exports.getToken = function (req, res, next) {
  users.findUser(req.body.username, req.body.password).then((result) => {
    if (result == null) {
      res.status(404).send({
        message: "کاربر یافت نشد",
      });
    } else {
      const token = jwt.sign({ username: req.body.username,password:req.body.password }, "SECRET");
      res.status(200).send({
        user:result.dataValues,
        token: token,
      });
    }
  });
};
