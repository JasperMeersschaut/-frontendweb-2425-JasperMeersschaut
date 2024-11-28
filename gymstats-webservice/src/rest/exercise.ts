import Router from '@koa/router';
import * as exerciseService from '../service/exercise';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import Joi from 'joi';
import validate from '../core/validation';
import type {
  CreateExerciseRequest,
  CreateExerciseResponse,
  GetExerciseByIdResponse,
  UpdateExerciseRequest,
  UpdateExerciseResponse,
  GetAllExercisesResponse,
} from '../types/exercise';
import type { IdParams } from '../types/common';
import { requireAuthentication } from '../core/auth';

//getAll
const getAllExercises = async (ctx: KoaContext<GetAllExercisesResponse>) => {
  const exercise = await exerciseService.getAll();
  ctx.body = {    items: exercise}; 
};
getAllExercises.validationScheme=null;

//getById
const getExerciseById = async (ctx: KoaContext<GetExerciseByIdResponse, IdParams>) => {
  const id = Number(ctx.params.id);
  const exercise = await exerciseService.getById(id);
  if (exercise) {
    ctx.body = exercise;
  } else {
    ctx.status = 404;
  }
};
getExerciseById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

export const createExercise = async (ctx: KoaContext<CreateExerciseResponse, void, CreateExerciseRequest>) => {
  const exercise = await exerciseService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = exercise;
};
createExercise.validationScheme={
  body:{
    type: Joi.string().min(1).max(50).required(),
    muscleGroup: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(500),
  },
};

export const updateExerciseById = async (ctx: KoaContext<UpdateExerciseResponse, IdParams, UpdateExerciseRequest>) => {
  const exercise = await exerciseService.updateById(Number(ctx.params.id), ctx.request.body);
  ctx.body = exercise;
};
updateExerciseById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    type: Joi.string().min(1).max(50).required(),
    muscleGroup: Joi.string().min(1).max(50).required(),
    description : Joi.string().min(1).max(500),
  },
};

export const deleteExerciseById = async (ctx: KoaContext<void, IdParams>) => {
  await exerciseService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteExerciseById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  
};
const getAllMuscleGroups = async (ctx: KoaContext) => {
  const muscleGroups = await exerciseService.getAllMuscleGroups();
  ctx.body = { items: muscleGroups };
};
getAllMuscleGroups.validationScheme = null;

export default (parent: KoaRouter) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/exercises',
  });
  router.use(requireAuthentication);

  router.get('/', validate(getAllExercises.validationScheme), getAllExercises);
  router.get('/muscle-groups', validate(getAllMuscleGroups.validationScheme), getAllMuscleGroups);
  router.post('/', validate(createExercise.validationScheme), createExercise);
  router.get('/:id', validate(getExerciseById.validationScheme), getExerciseById);
  router.put('/:id', validate(updateExerciseById.validationScheme), updateExerciseById);
  router.delete('/:id', validate(deleteExerciseById.validationScheme), deleteExerciseById);

  parent.use(router.routes()).use(router.allowedMethods());
};
