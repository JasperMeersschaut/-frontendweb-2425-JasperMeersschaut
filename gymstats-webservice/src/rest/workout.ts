import Router from '@koa/router';
import * as workoutService from '../service/workout';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import Joi from 'joi';
import validate from '../core/validation';
import type {
  CreateWorkoutRequest,
  CreateWorkoutResponse,
  GetWorkoutByIdResponse,
  UpdateWorkoutRequest,
  UpdateWorkoutResponse,
  GetAllWorkoutsResponse,
} from '../types/workout';
import type { IdParams } from '../types/common'; 

//getAll
const getAllWorkouts = async (ctx: KoaContext<GetAllWorkoutsResponse>) => {
  const userId = ctx.state.session.userId;
  const workouts = await workoutService.getAll(userId);
  ctx.body = { items: workouts };
};
getAllWorkouts.validationScheme = null;

//getById
const GetWorkoutById = async (ctx: KoaContext<GetWorkoutByIdResponse, IdParams>) => {
  const id = Number(ctx.params.id);
  const exercise = await workoutService.getById(id);
  if (exercise) {
    ctx.body = exercise;
  } else {
    ctx.status = 404;
  }
};
GetWorkoutById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

//createWorkout
export const creatWorkout = async (ctx: KoaContext<CreateWorkoutResponse, void, CreateWorkoutRequest>) => {
  const workout = await workoutService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = workout;
};
creatWorkout.validationScheme={
  body:{
    type: Joi.string().min(1).max(50).required(),
    duration: Joi.number().integer().positive().required(),
    muscleFocus: Joi.string().min(1).max(50).required(),
  },
};

//updateWorkoutById
export const updateWorkoutById = async (ctx: KoaContext<UpdateWorkoutResponse, IdParams, UpdateWorkoutRequest>) => {
  const user = await workoutService.updateById((Number(ctx.params.id)), ctx.request.body);
  ctx.body = user;
};
updateWorkoutById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    type: Joi.string().min(1).max(50).required(),
    muscleGroup: Joi.string().min(1).max(50).required(),
  },
};

export const deleteWorkoutById = async (ctx: KoaContext<void, IdParams>) => {
  await workoutService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteWorkoutById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getAllMuscleFocuses = async (ctx: KoaContext) => {
  const muscleFocuses = await workoutService.getAllMuscleFocuses();
  ctx.body = { items: muscleFocuses };
};
getAllMuscleFocuses.validationScheme = null;

export default (parent: KoaRouter) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/workouts',
  });

  router.get('/', validate(getAllWorkouts.validationScheme), getAllWorkouts);
  router.post('/', validate(creatWorkout.validationScheme), creatWorkout);
  router.get('/muscle-focuses', validate(getAllMuscleFocuses.validationScheme), getAllMuscleFocuses);
  router.get('/:id', validate(GetWorkoutById.validationScheme), GetWorkoutById);
  router.put('/:id', validate(updateWorkoutById.validationScheme), updateWorkoutById);
  router.delete('/:id', validate(deleteWorkoutById.validationScheme), deleteWorkoutById);

  parent.use(router.routes()).use(router.allowedMethods());
};
