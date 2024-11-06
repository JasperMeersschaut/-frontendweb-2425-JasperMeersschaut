import Router from '@koa/router';
import * as workoutService from '../service/workout';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateWorkoutRequest,
  CreateWorkoutResponse,
  GetWorkoutByIdResponse,
  UpdateWorkoutRequest,
  UpdateWorkoutResponse,
  GetAllWorkoutsResponse,
} from '../types/workout';
import type { IdParams } from '../types/common'; 

const getAllUsers = async (ctx: KoaContext<GetAllWorkoutsResponse>) => {
  const workout = await workoutService.getAll();
  ctx.body = {
    items: workout,
  }; 
};

const getUserById = async (ctx: KoaContext<GetWorkoutByIdResponse, IdParams>) => {
  const id = Number(ctx.params.id);
  if (isNaN(id)) {
    ctx.status = 400;
    return;
  }
  const workout = await workoutService.getById(id);
  if (workout) {
    ctx.body = workout;
  } else {
    ctx.status = 404;;
  }
};

export const createUser = async (ctx: KoaContext<CreateWorkoutResponse, void, CreateWorkoutRequest>) => {
  const workout = await workoutService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = workout;
};

export const updateUserById = async (ctx: KoaContext<UpdateWorkoutResponse, IdParams, UpdateWorkoutRequest>) => {
  const user = await workoutService.updateById((Number(ctx.params.id)), ctx.request.body);
  ctx.body = user;
};

export const deleteUserById = async (ctx: KoaContext<void, IdParams>) => {
  await workoutService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

export default (parent: KoaRouter) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/workouts',
  });

  router.get('/', getAllUsers);
  router.post('/', createUser);
  router.get('/:id', getUserById);
  router.put('/:id', updateUserById);
  router.delete('/:id', deleteUserById);

  parent.use(router.routes()).use(router.allowedMethods());
};
