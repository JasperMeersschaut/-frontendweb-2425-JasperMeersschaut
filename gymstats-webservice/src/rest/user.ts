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
import { requireAuthentication, makeRequireRole } from '../core/auth'; // 👈 2
import roles from '../core/roles';

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
    length: Joi.number().integer().positive().required(),
    weight: Joi.number().positive().required(),
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
    length: Joi.number().integer().positive().required(),
    weight: Joi.number().positive().required(),
    password: Joi.string().min(8).required(),
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

  const requireAdmin=makeRequireRole(roles.ADMIN);

  router.get('/', requireAuthentication,validate(getAllUsers.validationScheme),getAllUsers);
  router.post('/', validate(createUser.validationScheme), createUser);
  router.get('/:id', requireAuthentication, validate(getUserById.validationScheme),getUserById) ;
  router.put('/:id', requireAuthentication,validate(updateUserById.validationScheme), updateUserById);
  router.delete('/:id', requireAuthentication, validate(deleteUserById.validationScheme), deleteUserById);

  parent.use(router.routes()).use(router.allowedMethods());
};
