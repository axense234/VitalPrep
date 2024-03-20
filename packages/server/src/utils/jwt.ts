import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const createJWT = (userId: string, username: string) => {
  return jwt.sign({ userId, username }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "3d",
  });
};

const verifyJWT = (token: string | void) => {
  return jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
};

export { createJWT, verifyJWT };
