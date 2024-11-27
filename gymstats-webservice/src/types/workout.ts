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
  items: { id: number }[];
}

export interface WorkoutUpdateInput extends Omit<WorkoutCreateInput, 'createdBy'> {}
export interface CreateWorkoutRequest extends Omit<WorkoutCreateInput, 'createdBy'> {}
export interface UpdateWorkoutRequest extends Omit<WorkoutCreateInput, 'createdBy'> {}

export interface GetAllWorkoutsResponse extends ListResponse<Workout> {}
export interface GetAllWorkoutsFromUserResponse extends GetAllWorkoutsResponse {}
export interface GetWorkoutByIdResponse extends Workout {}
export interface CreateWorkoutResponse extends GetWorkoutByIdResponse {}
export interface UpdateWorkoutResponse extends GetWorkoutByIdResponse {}
