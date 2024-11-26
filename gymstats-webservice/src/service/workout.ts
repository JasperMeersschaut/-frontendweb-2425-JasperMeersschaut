import { prisma } from '../data';
import type { Workout, WorkoutCreateInput, WorkoutUpdateInput } from '../types/workout';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';

const WORKOUT_SELECT = {
  id: true,
  type: true,
  duration: true,
  muscleFocus: true,
  items: true,
};

export const getAll = async (userId: number): Promise<Workout[]> => {
  try {
    return await prisma.workout.findMany({
      where: {
        OR: [
          { createdBy: null },
          { createdBy: userId },
        ],
      },
      select: WORKOUT_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getById = async (id: number): Promise<Workout> => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id,
      },
      select: WORKOUT_SELECT,
    });
    if (!workout) {
      throw ServiceError.notFound('No workout with this id exists');
    }
    return workout;
  } catch (error) {
    throw handleDBError(error);
  }
};

export const create = async (workout: WorkoutCreateInput): Promise<Workout> => {
  try {
    return await prisma.workout.create({
      data: workout,
      select: WORKOUT_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: WorkoutUpdateInput): Promise<Workout> => {
  try {
    return await prisma.workout.update({
      where: {
        id,
      },
      data: changes,
      select: WORKOUT_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.workout.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getAllMuscleFocuses = async (userId: number): Promise<string[]> => {
  try {
    const muscleFocuses = await prisma.workout.findMany({
      where: {
        OR: [
          { createdBy: null },
          { createdBy: userId },
        ],
      },
      select: {
        muscleFocus: true,
      },
      distinct: ['muscleFocus'],
    });
    return muscleFocuses.map((workout) => workout.muscleFocus);
  } catch (error) {
    throw handleDBError(error);
  }
};

