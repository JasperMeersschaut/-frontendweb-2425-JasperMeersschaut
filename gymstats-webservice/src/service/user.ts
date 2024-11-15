import { prisma } from '../data'; //TODO: nachecken of alles klopt
import type { User, UserCreateInput, UserUpdateInput } from '../types/user';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';

const USER_SELECT = {
  id: true,
  name: true,
  lastName: true,
  email: true,
  sex: true,
  birthdate: true,
  length: true,
  weight: true,
};

export const getAll = async () => {
  return prisma.user.findMany({
    select: USER_SELECT,
  });
};

export const getById = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id },select:USER_SELECT });

  if (!user) {
    throw ServiceError.notFound('No user with this id exists');
  }

  return user;
};

export const create = async (user: UserCreateInput): Promise<User> => {
  return prisma.user.create({
    data: user,
  });
};
export const updateById = async (id: number, changes: UserUpdateInput) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: changes,
    });
    return user;
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
