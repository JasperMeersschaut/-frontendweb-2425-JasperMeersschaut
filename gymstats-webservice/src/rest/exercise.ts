import Router from '@koa/router';
import * as exerciseService from '../service/exercise';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateExerciseRequest,
  CreateExerciseResponse,
  GetExerciseByIdResponse,
  UpdateExerciseRequest,
  UpdateExerciseResponse,
  GetAllExercisesResponse,
} from '../types/exercise';
import type { IdParams } from '../types/common';

const getAllExercises = async (ctx: KoaContext<GetAllExercisesResponse>) => {
  const exercise = await exerciseService.getAll();
  ctx.body = {
    items: exercise,
  }; 
};

const getExerciseById = async (ctx: KoaContext<GetExerciseByIdResponse, IdParams>) => {
  const id = Number(ctx.params.id);
  if (isNaN(id)) {
    ctx.status = 400;
    return;
  }
  const exercise = await exerciseService.getById(id);
  if (exercise) {
    ctx.body = exercise;
  } else {
    ctx.status = 404;;
  }
};

export const createExercise = async (ctx: KoaContext<CreateExerciseResponse, void, CreateExerciseRequest>) => {
  const exercise = await exerciseService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = exercise;
};

export const updateExerciseById = async (ctx: KoaContext<UpdateExerciseResponse, IdParams, UpdateExerciseRequest>) => {
  const exercise = await exerciseService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = exercise;
};

export const deleteExerciseById = async (ctx: KoaContext<void, IdParams>) => {
  await exerciseService.deleteById(ctx.params.id);
  ctx.status = 204;
};

export default (parent: KoaRouter) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/exercises',
  });

  router.get('/', getAllExercises);
  router.post('/', createExercise);
  router.get('/:id', getExerciseById);
  router.put('/:id', updateExerciseById);
  router.delete('/:id', deleteExerciseById);

  parent.use(router.routes()).use(router.allowedMethods());
};
