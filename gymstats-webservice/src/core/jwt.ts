// src/core/jwt.ts
import config from 'config'; 
import type {
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken'; 
import jwt from 'jsonwebtoken'; 
import util from 'node:util'; 
import type { User } from '../types/user';

const JWT_AUDIENCE = config.get<string>('auth.jwt.audience');
const JWT_SECRET = config.get<string>('auth.jwt.secret');
const JWT_ISSUER = config.get<string>('auth.jwt.issuer');
const JWT_EXPIRATION_INTERVAL = config.get<number>(
  'auth.jwt.expirationInterval',
);

const asyncJwtSign = util.promisify<JwtPayload, Secret, SignOptions, string>(  jwt.sign);
const asyncJwtVerify = util.promisify<  string, Secret,VerifyOptions, JwtPayload>(jwt.verify);

export const generateJWT = async (user:User):Promise<string>=>{
  const tokenData={roles:user.roles};

  const signOptions:SignOptions={
    issuer:JWT_ISSUER,
    audience:JWT_AUDIENCE,
    expiresIn:JWT_EXPIRATION_INTERVAL,
    subject:`${user.id}`,
  };
  return await asyncJwtSign(tokenData, JWT_SECRET, signOptions);
};

export const verifyJWT = async (authToken:string):Promise<JwtPayload>=>{
  const verifyOptions:VerifyOptions={
    issuer:JWT_ISSUER,
    audience:JWT_AUDIENCE,
  };
  return await asyncJwtVerify(authToken, JWT_SECRET, verifyOptions);
};
