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
        <div className='mb-4'>
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
            Type
          </label>
          <input
            {...methods.register('type', validationRules.type)}
            id='type'
            name='type'
            type='text'
            className='shadow appearance-none border rounded 
            w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Type'
            required
          />
          {methods.formState.errors.type && 
          <p className="text-red-500 text-xs italic">{methods.formState.errors.type.message}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='muscleGroup' className='block text-gray-700 font-bold mb-2'>
            Muscle Group
          </label>
          <select
            {...methods.register('muscleGroup', validationRules.muscleGroup)}
            id='muscleGroup'
            name='muscleGroup'
            className='shadow appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
          <p className="text-red-500 text-xs italic">{methods.formState.errors.muscleGroup.message}</p>}
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            data-cy='submit_exercise'
            disabled={isSubmitting}
          >
            {exercise?.id ? 'Save Exercise' : 'Add Exercise'}
          </button>
          <Link
            disabled={isSubmitting}
            className='ml-4 bg-gray-200 hover:bg-gray-300 
            text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            to='/exercises'
          >
            Cancel
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}