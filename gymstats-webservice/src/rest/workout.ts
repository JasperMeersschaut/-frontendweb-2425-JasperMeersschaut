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

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Represents a workout item
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       required:
 *         - type
 *         - duration
 *         - muscleFocus
 *       properties:
 *         type:
 *           type: "string"
 *         duration:
 *           type: "number"
 *         muscleFocus:
 *           type: "string"
 *         items:
 *           type: "array"
 *           items:
 *             type: "object"
 *             properties:
 *               id:
 *                 type: "number"
 *               type:
 *                 type: "string"
 *               muscleGroup:
 *                 type: "string"
 *               description:
 *                 type: "string"
 *         createdBy:
 *           type: "number"
 *       example:
 *         id: 2
 *         type: "Cardio"
 *         duration: 60
 *         muscleFocus: "Legs"
 *         items:
 *           - id: 2
 *             type: "Barbell Skullcrusher"
 *             muscleGroup: "Arms"
 *             description: "A tricep exercise performed with a barbell, focusing on the long head of the triceps."
 *         createdBy: 1
 *     WorkoutList:
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Workout"
 *
 *   requestBodies:
 *     Workout:
 *       description: The workout info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Cardio"
 *               duration:
 *                 type: number
 *                 example: 60
 *               muscleFocus:
 *                 type: string
 *                 example: "Legs"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 2
 */

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/WorkoutList"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 */
const getAllWorkouts = async (ctx: KoaContext<GetAllWorkoutsResponse>) => {
  const userId = ctx.state.session.userId;
  const workouts = await workoutService.getAll(userId);
  ctx.body = { items: workouts };
};
getAllWorkouts.validationScheme = null;

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by id
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested workout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Workout"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 */
const GetWorkoutById = async (ctx: KoaContext<GetWorkoutByIdResponse, IdParams>) => {
  const id = ctx.params.id;
  const exercise = await workoutService.getById(id, ctx.state.session.userId);
  ctx.body = exercise;
};
GetWorkoutById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout
 *     description: Creates a new workout for the user.
 *     tags:
 *      - Workouts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Workout"
 *     responses:
 *       201:
 *         description: The created workout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Workout"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
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
    duration: Joi.number().integer().positive().required().max(1000),
    muscleFocus: Joi.string().min(1).max(50).required(),
    items: Joi.array().items(Joi.object({
      id: Joi.number().integer().positive().required(),
    })).required(),
  },
};

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Update a workout by id
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Workout"
 *     responses:
 *       200:
 *         description: The updated workout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Workout"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 *     example:
 *       type: "Cardio"
 *       duration: 60
 *       muscleFocus: "Legs"
 *       items:
 *         - id: 2
 */
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
    duration: Joi.number().integer().positive().required().max(1000),
    muscleFocus: Joi.string().min(1).max(50).required(),
    items: Joi.array().items(Joi.object({
      id: Joi.number().integer().positive().required(),
    })).required(),
  },
};

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout by id
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No content
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
export const deleteWorkout = async (ctx: KoaContext<void, IdParams>) => {
  const isAdmin =  ctx.state.session.roles.includes('admin');
  
  await workoutService.deleteById(ctx.params.id, ctx.state.session.userId,isAdmin);
  ctx.status = 204;
};
deleteWorkout.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * @swagger
 * /api/workouts/muscle-focuses:
 *   get:
 *     summary: Get all muscle focuses
 *     tags:
 *       - Workouts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of muscle focuses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Legs", "Arms"]
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 */
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
