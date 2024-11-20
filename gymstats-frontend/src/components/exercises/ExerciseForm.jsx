import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

const EMPTY_EXERCISE = {
  id: undefined,
  type: '',
  muscleGroup: '',
};

const validationRules = {
  type: {
    required: 'Type is required',
  },
  muscleGroup: {
    required: 'Muscle Group is required',
  },
};

export default function ExerciseForm({ muscleGroups = [], exercise = EMPTY_EXERCISE, saveExercise }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      type: exercise?.type,
      muscleGroup: exercise?.muscleGroup,
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    if (!isValid) return;
    await saveExercise({
      id: exercise?.id,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => navigate('/exercises'),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
        <div className='mb-3'>
          <label htmlFor='type' className='form-label'>
            Type
          </label>
          <input
            {...methods.register('type', validationRules.type)}
            id='type'
            name='type'
            type='text'
            className='form-control'
            placeholder='Type'
            required
          />
          {methods.formState.errors.type && 
          <p className="form-text text-danger">{methods.formState.errors.type.message}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor='muscleGroup' className='form-label'>
            Muscle Group
          </label>
          <select
            {...methods.register('muscleGroup', validationRules.muscleGroup)}
            id='muscleGroup'
            name='muscleGroup'
            className='form-select'
            required
          >
            <option value='' disabled>
              -- Select a Muscle Group --
            </option>
            {muscleGroups.map((muscleGroup, index) => (
              <option key={index} value={muscleGroup}>
                {muscleGroup}
              </option>
            ))}
          </select>
          {methods.formState.errors.muscleGroup && 
          <p className="form-text text-danger">{methods.formState.errors.muscleGroup.message}</p>}
        </div>
        <div className='clearfix'>
          <div className='btn-group float-end'>
            <button
              type='submit'
              className='btn btn-primary'
              data-cy='submit_exercise'
              disabled={isSubmitting}
            >
              {exercise?.id ? 'Save Exercise' : 'Add Exercise'}
            </button>
            <Link
              disabled={isSubmitting}
              className='btn btn-light'
              to='/exercises'
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}