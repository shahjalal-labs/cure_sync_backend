//
import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });

  return token;
};

export const jwtHelpers = {
  generateToken,
};

/* 
import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (payload: object, secret: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"], // ✅
  });
  return token;
};

export const jwtHelpers = { generateToken }; */
