// src/service/transaction.ts
import { prisma  } from '../data';
import type { Exercise,ExerciseUpdateInput,ExerciseCreateInput } from '../types/exercise';

const EXERCISE_SELECT = {
  id: true,
  type:true,
  muscleGroup: true,
};

export const getAll = async () => {
  return prisma.exercise.findMany({
    select: EXERCISE_SELECT,
  });
};

export const getById = async (id: number) => {
  return prisma.exercise.findUnique({
    where: {
      id,
    },
    select: EXERCISE_SELECT,
  });
};

export const create = async (exercise: ExerciseCreateInput): Promise<Exercise> => {
  return prisma.exercise.create({
    data: exercise,
  });
};

export const updateById = async (
  id: number,
  changes: ExerciseUpdateInput,
): Promise<Exercise> => {
  return prisma.exercise.update({
    where: {
      id,
    },
    data: changes,
  });
};

export const deleteById = (id: number) => {
  return prisma.exercise.delete({
    where: {
      id,
    },
  });
};
