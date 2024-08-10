const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = expressAsyncHandler(async (req, res, next) => {
  const header = req.headers.Authorization || req.headers.authorization;
  if (header && header.startsWith("Bearer")) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Token has Expired. Please sign in Again");
      }
      // console.log("decoded", decoded)
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("User Not authorized");
  }
});

module.exports = validateToken;
