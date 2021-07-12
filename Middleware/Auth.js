const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    //first we split our token
    const token = authorization.split(" ")[1];
    //remember that: callback function works like a promise..
    jwt.verify(token, "secretkey", function (err, decoded) {
      if (err) {
        res.status(500).json({
          error: new Error("Invalid token please login"),
        }); 
      }
      //so if and only user is authenticated then our user will move to the route otherwise not
      if (decoded) {
        //nicely , adding new object
        req.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    res
      .status(401)
      .send(
        "Inavlid token please login!"
      );
  }
};

module.exports = Auth;
