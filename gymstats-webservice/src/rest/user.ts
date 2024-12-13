import type { Next } from 'koa';
import Router from '@koa/router';
import * as userService from '../service/user';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import Joi from 'joi';
import validate from '../core/validation';
import type {
  CreateUserRequest,
  LoginResponse,
  GetUserByIdResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  GetAllUsersResponse,
  GetUserRequest,
} from '../types/user';
import type { IdParams } from '../types/common'; 
import { requireAuthentication, makeRequireRole } from '../core/auth';
import Role from '../core/roles';
import { updateRolesById } from '../service/user';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Represents a user item
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       allOf:
 *         - $ref: "#/components/schemas/Base"
 *         - type: object
 *           required:
 *             - name
 *             - lastName
 *             - email
 *             - sex
 *             - birthdate
 *             - length
 *             - weight
 *           properties:
 *             name:
 *               type: "string"
 *             lastName:
 *               type: "string"
 *             email:
 *               type: "string"
 *               format: email
 *             sex:
 *               type: "string"
 *             birthdate:
 *               type: "string"
 *               format: date
 *             length:
 *               type: "number"
 *             weight:
 *               type: "number"
 *             roles:
 *               type: "array"
 *               items:
 *                 type: "string"
 *           example:
 *             id: 123
 *             name: "Jasper"
 *             lastName: "Meersschaut"
 *             email: "meersschaut.jasper@gmail.com"
 *             sex: "Male"
 *             birthdate: "2005-01-16"
 *             length: 180
 *             weight: 75
 *             roles: ["admin", "user"]
 *     UsersList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/User"
 *       example:
 *         - id: 123
 *           name: "Jasper"
 *           lastName: "Meersschaut"
 *           email: "meersschaut.jasper@gmail.com"
 *           sex: "Male"
 *           birthdate: "2005-01-16"
 *           length: 180
 *           weight: 75
 *           roles: ["admin", "user"]
 *         - id: 124
 *           name: "John"
 *           lastName: "Doe"
 *           email: "john@example.com"
 *           sex: "Male"
 *           birthdate: "1985-05-15"
 *           length: 175
 *           weight: 70
 *           roles: ["user"]
 */

const checkUserId = (ctx: KoaContext<unknown, GetUserRequest>, next: Next) => {
  const { userId, roles } = ctx.state.session;
  const { id } = ctx.params;

  // You can only get our own data unless you're an admin
  if (id !== 'me' && id !== userId && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      'You are not allowed to view this user\'s information',
      { code: 'FORBIDDEN' },
    );
  }
  return next();
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *      - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UsersList"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 */
const getAllUsers = async (ctx: KoaContext<GetAllUsersResponse>) => {
  const users = await userService.getAll();
  ctx.body = { items: users };
};
getAllUsers.validationScheme = null;

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user
 *     description: Get a single user by their id or your own information if you use 'me' as the id
 *     tags:
 *      - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       200:
 *         description: The requested user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
const getUserById = async (ctx: KoaContext<GetUserByIdResponse, GetUserRequest>) => {
  const user = await userService.getById(
    ctx.params.id === 'me' ? ctx.state.session.userId : ctx.params.id,
  );
  ctx.body = user;
};
getUserById.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
  },
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags:
 *      - Users
 *     requestBody:
 *       description: The user's data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               sex:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               length:
 *                 type: number
 *               weight:
 *                 type: number
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "fake-jwt-token-1234567890"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 */
export const createUser = async (ctx: KoaContext<LoginResponse, void, CreateUserRequest>) => {
  const token  = await userService.register(ctx.request.body);
  ctx.status = 201;
  ctx.body = {token};
};
createUser.validationScheme={  
  body:{ 
    name: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    sex: Joi.string().valid('Male', 'Female').required(),
    birthdate: Joi.date().iso().less('now').required(),
    length: Joi.number().integer().positive().required().less(300),
    weight: Joi.number().positive().required().less(300),
    password: Joi.string().min(8).required(),
  },
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags:
 *      - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     requestBody:
 *       description: The user's data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               sex:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               length:
 *                 type: number
 *               weight:
 *                 type: number
 *             example:
 *               name: "Jasper"
 *               lastName: "Meersschaut"
 *               email: "meersschaut.jasper@gmail.com"
 *               sex: "Male"
 *               birthdate: "2005-01-16"
 *               length: 180
 *               weight: 75
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
export const updateUserById = async (ctx: KoaContext<UpdateUserResponse, IdParams, UpdateUserRequest>) => {
  const user = await userService.updateById((ctx.params.id), ctx.request.body);
  ctx.body = user;
};
updateUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    name: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    sex: Joi.string().valid('Male', 'Female').required(),
    birthdate: Joi.date().iso().less('now').required(),
    length: Joi.number().integer().positive().required().less(300),
    weight: Joi.number().positive().required().less(300),
  },
};

// /**
//  * @swagger
//  * /api/users/{id}/roles:
//  *   put:
//  *     summary: Update user roles
//  *     tags:
//  *      - Users
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - $ref: "#/components/parameters/idParam"
//  *     requestBody:
//  *       description: The user's roles
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               roles:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   enum: [user, admin]
//  *     responses:
//  *       200:
//  *         description: The updated user roles
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: "#/components/schemas/User"
//  *       400:
//  *         $ref: '#/components/responses/400BadRequest'
//  *       401:
//  *         $ref: '#/components/responses/401Unauthorized'
//  *       403:
//  *         $ref: '#/components/responses/403Forbidden'
//  *       404:
//  *         $ref: '#/components/responses/404NotFound'
//  */
export const updateUserRoleById = async (ctx: KoaContext<UpdateUserResponse, IdParams, UpdateUserRequest>) => {
  const user = await updateRolesById(ctx.params.id, ctx.request.body.roles);
  ctx.body = user;
};
updateUserRoleById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    roles: Joi.array().items(Joi.string().valid('user', 'admin')).required(),
  },
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *      - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     responses:
 *       204:
 *         description: No response, the delete was successful
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *       404:
 *         $ref: '#/components/responses/404NotFound'
 */
const deleteUserById = async (ctx: KoaContext<void, IdParams>) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};
export default (parent: KoaRouter) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/users',
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get('/', requireAuthentication, requireAdmin, validate(getAllUsers.validationScheme), getAllUsers);
  router.post('/', validate(createUser.validationScheme), createUser);
  router.get('/:id', requireAuthentication, validate(getUserById.validationScheme),checkUserId,getUserById) ;
  router.put('/:id', requireAuthentication,validate(updateUserById.validationScheme),checkUserId, updateUserById);
  router.put('/:id/roles', requireAuthentication,validate(updateUserRoleById.validationScheme),checkUserId
    , updateUserRoleById);
  router.delete('/:id', requireAuthentication, validate(deleteUserById.validationScheme),checkUserId, deleteUserById);

  parent.use(router.routes()).use(router.allowedMethods());
};
