import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const generateToken = (id: string): string => {
  return jwt.sign({ user: { id } }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
