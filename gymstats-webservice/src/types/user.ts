import type { Entity, ListResponse } from './common';

export interface User extends Entity {
  name: string;
  lastName: string;
  email: string;
  sex: string;
  birthdate: Date;
  length: number;
  weight: number;
}

export interface UserCreateInput {
  name: string;
  lastName: string;
  email: string;
  sex: string;
  birthdate: Date;
  length: number;
  weight: number;
}

export interface UserUpdateInput extends UserCreateInput {}

export interface CreateUserRequest extends UserCreateInput {}
export interface UpdateUserRequest extends UserUpdateInput {}

export interface GetAllUsersResponse extends ListResponse<User> {}
export interface GetUserByIdResponse extends User {}
export interface CreateUserResponse extends GetUserByIdResponse {}
export interface UpdateUserResponse extends GetUserByIdResponse {}
