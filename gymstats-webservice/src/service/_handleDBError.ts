import ServiceError from '../core/serviceError';

const handleDBError = (error: any) => {
  const { code = '', message } = error;

  if (code === 'P2002') {
    switch (true) {
      case message.includes('idx_user_email_unique'):
        throw ServiceError.validationFailed(
          'There is already a user with this email address',
        );
      default:
        throw ServiceError.validationFailed('This item already exists');
    }
  }

  if (code === 'P2025') {
    switch (true) {
      case message.includes('fk_userWorkout_user'):
        throw ServiceError.notFound('This user does not exist');
      case message.includes('fk_userWorkout_workout'):
        throw ServiceError.notFound('This workout does not exist');
      case message.includes('userWorkout'):
        throw ServiceError.notFound('No user workout with this id exists');
      case message.includes('workout'):
        throw ServiceError.notFound('No workout with this id exists');
      case message.includes('user'):
        throw ServiceError.notFound('No user with this id exists');
      case message.includes('exercise'):
        throw ServiceError.notFound('No exercise with this id exists');
    }
  }

  if (code === 'P2003') {
    switch (true) {
      case message.includes('user_id'):
        throw ServiceError.conflict(
          'This user does not exist or is still linked to workouts',
        );
      case message.includes('workout_id'):
        throw ServiceError.conflict(
          'This workout does not exist or is still linked to users',
        );
    }
  }

  // Rethrow error because we don't know what happened
  throw error;
};

export default handleDBError;
