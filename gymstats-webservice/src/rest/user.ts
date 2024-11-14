import Router from '@koa/router';
import * as userService from '../service/user';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import Joi from 'joi';
import validate from '../core/validation';
import type {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByIdResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  GetAllUsersResponse,
} from '../types/user';
import type { IdParams } from '../types/common'; 

//getAll
const getAllUsers = async (ctx: KoaContext<GetAllUsersResponse>) => {
  const users = await userService.getAll();
  ctx.body = { items: users };
};
getAllUsers.validationScheme = null;

//getbyid
const getUserById = async (ctx: KoaContext<GetUserByIdResponse, IdParams>) => {
  const id = Number(ctx.params.id);
  if (isNaN(id)) {
    ctx.status = 400;
    return;
  }
  const user = await userService.getById(id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.status = 404;;
  }
};
getUserById.validationScheme ={
  params:{
    id:Joi.number().integer().positive(),
  },
};

//user creation
export const createUser = async (ctx: KoaContext<CreateUserResponse, void, CreateUserRequest>) => {
  const user = await userService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = user;
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

  router.get('/', validate(getAllUsers.validationScheme),getAllUsers);
  router.post('/', validate(createUser.validationScheme), createUser);
  router.get('/:id', validate(getUserById.validationScheme),getUserById) ;
  router.put('/:id',validate(updateUserById.validationScheme), updateUserById);
  router.delete('/:id', validate(deleteUserById.validationScheme), deleteUserById);

  parent.use(router.routes()).use(router.allowedMethods());
};
