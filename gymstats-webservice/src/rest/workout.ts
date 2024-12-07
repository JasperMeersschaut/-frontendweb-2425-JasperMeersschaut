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
import { requireAuthentication } from '../core/auth';

//getAll
const getAllWorkouts = async (ctx: KoaContext<GetAllWorkoutsResponse>) => {
  const userId = ctx.state.session.userId;
  const workouts = await workoutService.getAll(userId);
  ctx.body = { items: workouts };
};
getAllWorkouts.validationScheme = null;

//getById
const GetWorkoutById = async (ctx: KoaContext<GetWorkoutByIdResponse, IdParams>) => {
  const id = ctx.params.id;
  const exercise = await workoutService.getById(id, ctx.state.session.userId);
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

export const createWorkout = async (ctx: KoaContext<CreateWorkoutResponse, void, CreateWorkoutRequest>) => {
  const { userId, roles } = ctx.state.session;
  const isAdmin = roles.includes('admin');

  const workout = await workoutService.create({
    ...ctx.request.body,
    createdBy: isAdmin ? null : userId,
  });

  ctx.status = 201;
  ctx.body = workout;
};
createWorkout.validationScheme = {
  body: {
    type: Joi.string().min(1).max(50).required(),
    duration: Joi.number().integer().positive().required(),
    muscleFocus: Joi.string().min(1).max(50).required(),
    items: Joi.array().items(Joi.object({
      id: Joi.number().integer().positive().required(),
    })).required(),
  },
};

// Update Workout
export const updateWorkoutById = async (ctx: KoaContext<UpdateWorkoutResponse, IdParams, UpdateWorkoutRequest>) => {
  const userId = ctx.state.session.userId;
  const isAdmin =  ctx.state.session.roles.includes('admin');
  const workoutData = {
    ...ctx.request.body,
  };
  const workout = await workoutService.updateById(ctx.params.id, userId, workoutData, isAdmin);
  ctx.body = workout;
};
updateWorkoutById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    type: Joi.string().min(1).max(50).required(),
    duration: Joi.number().integer().positive().required(),
    muscleFocus: Joi.string().min(1).max(50).required(),
    items: Joi.array().items(Joi.object({
      id: Joi.number().integer().positive().required(),
    })).required(),
  },
};
export const deleteWorkout = async (ctx: KoaContext<void, IdParams>) => {
  await workoutService.deleteById(ctx.params.id, ctx.state.session.userId);
  ctx.status = 204;
};
deleteWorkout.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getAllMuscleFocuses = async (ctx: KoaContext) => {
  const userId = ctx.state.session.userId;
  const muscleFocuses = await workoutService.getAllMuscleFocuses(userId);
  ctx.body = { items: muscleFocuses };
};
getAllMuscleFocuses.validationScheme = null;

export default (parent: KoaRouter) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/workouts',
  });

  router.use(requireAuthentication);

  router.get('/', validate(getAllWorkouts.validationScheme), getAllWorkouts);
  router.post('/', validate(createWorkout.validationScheme), createWorkout);
  router.get('/muscle-focuses', validate(getAllMuscleFocuses.validationScheme), getAllMuscleFocuses);
  router.get('/:id', validate(GetWorkoutById.validationScheme), GetWorkoutById);
  router.put('/:id', validate(updateWorkoutById.validationScheme), updateWorkoutById);
  router.delete('/:id', validate(deleteWorkout.validationScheme), deleteWorkout);

  parent.use(router.routes()).use(router.allowedMethods());
};
