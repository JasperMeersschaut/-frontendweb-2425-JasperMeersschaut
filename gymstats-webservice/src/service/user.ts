import { prisma } from '../data'; //TODO: nachecken of alles klopt
import type { User, UserCreateInput, UserUpdateInput,PublicUser } from '../types/user';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';
import { hashPassword, verifyPassword } from '../core/password';
import { generateJWT } from '../core/jwt';
import config from 'config'; 
import jwt from 'jsonwebtoken';
import { getLogger } from '../core/logging'; 
import { generateJWT, verifyJWT } from '../core/jwt'; 
import type { SessionInfo } from '../types/auth';

export const checkAndParseSession = async (
  authHeader?: string,
): Promise<SessionInfo> => {
  if (!authHeader) {
    throw ServiceError.unauthorized('You need to be signed in');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
  }

  const authToken = authHeader.substring(7);

  try {
    const { roles, sub } = await verifyJWT(authToken);

    return {
      userId: Number(sub),
      roles,
    };
  } catch (error: any) {
    getLogger().error(error.message, { error });

    if (error instanceof jwt.TokenExpiredError) {
      throw ServiceError.unauthorized('The token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw ServiceError.unauthorized(
        `Invalid authentication token: ${error.message}`,
      );
    } else {
      throw ServiceError.unauthorized(error.message);
    }
  }
};

export const checkRole = (role: string, roles: string[]): void => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      'You are not allowed to view this part of the application',
    );
  }
};

const makeExposedUser=({id,name,lastName,email,sex,birthdate,length,weight}:User):PublicUser => {
  return {id,name,lastName,email,sex,birthdate,length,weight};
};

export const getAll = async (): Promise<PublicUser[]> => {
  const users = await prisma.user.findMany();
  return users.map(makeExposedUser);
};

export const getById = async (id: number): Promise<PublicUser> => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw ServiceError.notFound('No user with this id exists');
  }

  return makeExposedUser(user);
};

export const register = async ({name,lastName,email,sex,password,birthdate,length,weight}:UserCreateInput): 
Promise<string> => {
  const passwordHash = await hashPassword(password);
  user =  prisma.user.create({
    data: {name,lastName,email,sex,birthdate,length,weight,password_hash:passwordHash,roles:['user']}});
  return await generateJWT(user);
};

export const updateById = async (id: number, changes: UserUpdateInput): Promise<PublicUser> => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: changes,
    });
    return makeExposedUser(user);
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const login = async (email: string, password: string): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw ServiceError.unauthorized('Invalid email or password');
  }

  const passwordValid = await verifyPassword(password, user.password_hash);
  if (!passwordValid) {
    throw ServiceError.unauthorized('Invalid email or password');
  }

  return await generateJWT(user);
};
