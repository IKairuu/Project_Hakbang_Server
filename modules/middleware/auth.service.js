import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export function authorization(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res
      .status(400)
      .json({ message: "Token Error: There is no token", status: 400 });
  }

  const token = header.split(" ")[1];
  if (!token)
    return res
      .status(400)
      .json({ message: "Token Error: Invalid token format", status: 400 });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Token Error: Invalid token", status: 400 });
    }
    req.user = user;
    next();
  });
}
