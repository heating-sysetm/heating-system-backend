
const jwt = require('jsonwebtoken');

exports.ensureToken = function (req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'] 
       
    if(typeof authHeader== 'undefined') return res.sendStatus(401)

    const token =authHeader.split(' ')[1]

    if (token == '') return res.sendStatus(401) // if there isn't any token
    jwt.verify(token,'SECRET', (err, user) => {
        console.log(err);
        
        if (err) return res.sendStatus(403)
        next() // pass the execution off to whatever request the client intended
      })
  }

  exports.getToken = function (req, res, next) {
    const user = {id:1};
    const token = jwt.sign({user},'SECRET');
    console.log(token);
    res.send({
        token:token 
    });
  }
