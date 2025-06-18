import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;

const verifyToken = (data: string) => {
  return jwt.verify(data, JWT_SECRET);
};

export const verifyWithJose = async <T>(token: string) => {
  const secret = new TextEncoder().encode(JWT_SECRET);

  const { payload } = await jwtVerify<T>(token, secret);
  console.log(payload, "<<<< payload from verifyWithJose");
  return payload;
};
