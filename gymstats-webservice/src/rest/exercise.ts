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
import { requireAuthentication,makeRequireRole } from '../core/auth';
import roles from '../core/roles';

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Represents a gym exercise
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - id
 *         - type
 *         - muscleGroup
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         type:
 *           type: string
 *           example: Strength
 *         muscleGroup:
 *           type: string
 *           example: Chest
 *         description:
 *           type: string
 *           example: Bench press exercise
 *     ExerciseList:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Exercise"
 *
 *   requestBodies:
 *     CreateExerciseRequest:
 *       description: The exercise info to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Exercise"
 *     UpdateExerciseRequest:
 *       description: The exercise info to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Exercise"
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exercises
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ExerciseList"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 */
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
  ctx.body = exercise;
};
getExerciseById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
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

  const requireAdmin=makeRequireRole(roles.ADMIN);

  router.get('/', validate(getAllExercises.validationScheme), getAllExercises);
  router.get('/muscle-groups', validate(getAllMuscleGroups.validationScheme), getAllMuscleGroups);
  router.post('/', requireAdmin, validate(createExercise.validationScheme), createExercise);
  router.get('/:id', validate(getExerciseById.validationScheme), getExerciseById);
  router.put('/:id', requireAdmin, validate(updateExerciseById.validationScheme), updateExerciseById);
  router.delete('/:id', requireAdmin,validate(deleteExerciseById.validationScheme), deleteExerciseById);

  parent.use(router.routes()).use(router.allowedMethods());
};
