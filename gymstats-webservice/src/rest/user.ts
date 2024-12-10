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

//getAll
const getAllUsers = async (ctx: KoaContext<GetAllUsersResponse>) => {
  const users = await userService.getAll();
  ctx.body = { items: users };
};
getAllUsers.validationScheme = null;

//getbyid
const getUserById = async (ctx: KoaContext<GetUserByIdResponse, GetUserRequest>) => {
  const user = await userService.getById(
    ctx.params.id === 'me' ? ctx.state.session.userId : ctx.params.id,
  );
  ctx.status = 200;
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

//user creation
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

//Update user 
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

// Delete user 
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
