import { prisma } from '../data';
import type { Exercise, ExerciseUpdateInput, ExerciseCreateInput } from '../types/exercise';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';

const EXERCISE_SELECT = {
  id: true,
  type: true,
  muscleGroup: true,
  description:true,
};

export const getAll = async (): Promise<Exercise[]> => {
  try {
    return await prisma.exercise.findMany({
      select: EXERCISE_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getAllMuscleGroups = async (): Promise<string[]> => {
  try {
    const muscleGroups = await prisma.exercise.findMany({
      distinct: ['muscleGroup'],
      select: {
        muscleGroup: true,
      },
    });
    return muscleGroups.map((group) => group.muscleGroup);
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getById = async (id: number): Promise<Exercise> => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id,
      },
      select: EXERCISE_SELECT,
    });
    if (!exercise) {
      throw ServiceError.notFound('No exercise with this id exists');
    }
    return exercise;
  } catch (error) {
    throw handleDBError(error);
  }
};

export const create = async (exercise: ExerciseCreateInput): Promise<Exercise> => {
  try {
    return await prisma.exercise.create({
      data: exercise,
      select: EXERCISE_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: ExerciseUpdateInput): Promise<Exercise> => {
  try {
    return await prisma.exercise.update({
      where: {
        id,
      },
      data: changes,
      select: EXERCISE_SELECT,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.exercise.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};
