import Router from '@koa/router';
import * as userService from '../service/user';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByIdResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  GetAllUsersResponse,
} from '../types/user';
import type { IdParams } from '../types/common'; 

const getAllUsers = async (ctx: KoaContext<GetAllUsersResponse>) => {
  const exercise = await userService.getAll();
  ctx.body = {
    items: exercise,
  }; 
};

const getUserById = async (ctx: KoaContext<GetUserByIdResponse, IdParams>) => {
  const id = Number(ctx.params.id);
  if (isNaN(id)) {
    ctx.status = 400;
    return;
  }
  const exercise = await userService.getById(id);
  if (exercise) {
    ctx.body = exercise;
  } else {
    ctx.status = 404;;
  }
};

export const createUser = async (ctx: KoaContext<CreateUserResponse, void, CreateUserRequest>) => {
  const user = await userService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = user;
};

export const updateUserById = async (ctx: KoaContext<UpdateUserResponse, IdParams, UpdateUserRequest>) => {
  const user = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = user;
};

export const deleteUserById = async (ctx: KoaContext<void, IdParams>) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};

export default (parent: KoaRouter) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/users',
  });

  router.get('/', getAllUsers);
  router.post('/', createUser);
  router.get('/:id', getUserById);
  router.put('/:id', updateUserById);
  router.delete('/:id', deleteUserById);

  parent.use(router.routes()).use(router.allowedMethods());
};
