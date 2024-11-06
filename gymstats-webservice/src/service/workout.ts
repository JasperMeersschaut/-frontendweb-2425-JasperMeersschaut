import { prisma } from '../data';
import type { Workout, WorkoutCreateInput, WorkoutUpdateInput } from '../types/workout';

const WORKOUT_SELECT = {
  id: true,
  type: true,
  duration: true,
  muscleFocus: true,
  items: true,
};

export const getAll = async () => {
  return prisma.workout.findMany({
    select: WORKOUT_SELECT,
  });
};

export const getById = async (id: number) => {
  return prisma.workout.findUnique({
    where: {
      id,
    }, 
    select: WORKOUT_SELECT,
  });
};

export const create = async (workout: WorkoutCreateInput): Promise<Workout> => {
  return prisma.workout.create({
    data: workout,
  });
};
 
export const updateById = async (
  id: number,
  changes: WorkoutUpdateInput,
): Promise<Workout> => {
  return prisma.workout.update({
    where: {
      id,
    },
    data: changes,
  });
};

export const deleteById = async (id: number): Promise<void> => {
  await prisma.workout.delete({
    where: {
      id,
    },
  });
};
