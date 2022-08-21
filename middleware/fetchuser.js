var jwt = require("jsonwebtoken");
const config = process.env;
const secret = "howyoudoin?";

const fetchuser = (req, res, next) => {
  // console.log("hi, there myself rahul raut");
  // Get the user from the jwt token & add id to req object.
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token." });
  }

  try {
    // token = token.replace(/^Bearer\s+/, "");
    // console.log(token);
    const data = jwt.verify(token, secret);
    // console.log(data)
    req.user = data;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Wrong Token! Please authenticate using a valid token." });
  }
};

module.exports = fetchuser;