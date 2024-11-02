import { prisma } from '../data';
import type { User, UserCreateInput, UserUpdateInput } from '../types/user';

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

export const getById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    }, 
    select: USER_SELECT,
  });
};

export const create = async (user: UserCreateInput): Promise<User> => {
  return prisma.user.create({
    data: user,
  });
};
 
export const updateById = async (
  id: number,
  changes: UserUpdateInput,
): Promise<User> => {
  return prisma.user.update({
    where: {
      id,
    },
    data: changes,
  });
};

export const deleteById = async (id: number): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};
