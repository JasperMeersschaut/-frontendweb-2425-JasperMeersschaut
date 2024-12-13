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
 *         - type
 *         - muscleGroup
 *       properties:
 *         type:
 *           type: "string"
 *         muscleGroup:
 *           type: "string"
 *         description:
 *           type: "string"
 *       example:
 *             id: 123
 *             type: "Exercise1"
 *             muscleGroup: "Chest"
 *             description: "Lorem"
 *     ExerciseList:
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Exercise"
 *
 *   requestBodies:
 *     Exercise:
 *       description: The exercise info to save.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Exercise1"
 *               muscleGroup:
 *                 type: string
 *                 example: "Chest"
 *               description:
 *                 type: string
 *                 example: "Lorem"
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

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get an exercise by id
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Exercise"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 */
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

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Create a new exercise
 *     description: Creates a new exercise for all the user.
 *     tags:
 *      - Exercises
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: "#/components/requestBodies/Exercise"
 *     responses:
 *       200:
 *         description: The created exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Exercise"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
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

/**
 * @swagger
 * /api/exercises/{id}:
 *   put:
 *     summary: Update an exercise by id
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       $ref: "#/components/requestBodies/Exercise"
 *     responses:
 *       200:
 *         description: The updated exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Exercise"
 *         examples:
 *           application/json:
 *             value:
 *               id: 123
 *               type: "Updated Exercise"
 *               muscleGroup: "Chest"
 *               description: "Updated description"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
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

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise by id
 *     tags:
 *       - Exercises
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
export const deleteExerciseById = async (ctx: KoaContext<void, IdParams>) => {
  await exerciseService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteExerciseById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  
};
/**
 * @swagger
 * /api/exercises/muscle-groups:
 *   get:
 *     summary: Get all muscle groups
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of muscle groups
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Chest", "Back", "Legs"]
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 */
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
