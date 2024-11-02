import type { Entity,ListResponse  } from './common';

export interface Exercise extends Entity {
  type: string;
  muscleGroup: string;
}
export interface ExerciseCreateInput {
  type: string;
  muscleGroup: string;
}
  
export interface ExerciseUpdateInput extends ExerciseCreateInput {}
export interface CreateExerciseRequest extends ExerciseCreateInput {}
export interface UpdateExerciseRequest extends ExerciseUpdateInput {}

export interface GetAllExercisesResponse extends ListResponse<Exercise> {}
export interface GetExerciseByIdResponse extends Exercise {}
export interface CreateExerciseResponse extends GetExerciseByIdResponse {}
export interface UpdateExerciseResponse extends GetExerciseByIdResponse {}
