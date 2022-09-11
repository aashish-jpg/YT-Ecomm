const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({id}, "moreover", {
    expiresIn: "15d",
  });
};
module.exports = generateToken;