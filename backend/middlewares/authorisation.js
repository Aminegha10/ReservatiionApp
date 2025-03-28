import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const authorization = (req, res, next) => {
  // get of the token
  const header = req.headers.authorization;
  if (header == null) {
    return res.json("header not found");
  }
  const token = header.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.json("token not found");
  }
  // Verify
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send("You have to log in");
    }
    req.user = user;
    console.log("User authenticated");
    next();
  });
};
