const jwt = require("jsonwebtoken");

const jwtMiddelware = (req, res, next) => {
  const token = req.headers["authorization"].split(' ')[1];
  console.log(token);

  try {
    const jwtResponse = jwt.verify(token, "secretKey");
    console.log(jwtResponse);
    req.payload = jwtResponse.userId;
    next();
  } catch (error) {
    response.status(401).json("Authorization failed");
  }
};


module.exports = jwtMiddelware;