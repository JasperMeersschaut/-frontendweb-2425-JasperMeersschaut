import type { Entity, ListResponse } from './common';

export interface Workout extends Entity {
  type: string;
  duration: number;
  muscleFocus: string;
  createdBy?: number | null;
}

export interface WorkoutCreateInput {
  type: string;
  duration: number;
  muscleFocus: string;
  createdBy?: number | null;
}

export interface WorkoutUpdateInput extends WorkoutCreateInput {}

export interface CreateWorkoutRequest extends WorkoutCreateInput {}
export interface UpdateWorkoutRequest extends WorkoutUpdateInput {}

export interface GetAllWorkoutsResponse extends ListResponse<Workout> {}
export interface GetAllWorkoutsFromUserResponse extends GetAllWorkoutsResponse {}
export interface GetWorkoutByIdResponse extends Workout {}
export interface CreateWorkoutResponse extends GetWorkoutByIdResponse {}
export interface UpdateWorkoutResponse extends GetWorkoutByIdResponse {}
