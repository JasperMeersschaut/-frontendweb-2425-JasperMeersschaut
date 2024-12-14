import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../LabelInput.jsx';
import SelectList from '../SelectList.jsx';

const EMPTY_EXERCISE = {
  id: undefined,
  type: '',
  muscleGroup: '',
  description:'',
};
const validationRules = {
  type: {
    required: 'Type is required',
  },
  muscleGroup: {
    required: 'Muscle Group is required',
  },
  description: {
    required: 'Description is required',
  },
};
export default function ExerciseForm({ muscleGroups = [], exercise = EMPTY_EXERCISE, saveExercise }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      type: exercise?.type,
      muscleGroup: exercise?.muscleGroup,
      description: exercise?.description,
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
          <LabelInput
            label='Type'
            type='text'
            name='type'
            placeholder='Type'
            validationRules={validationRules.type}
            data-cy='type_input'
          />
        </div>

        <div className='mb-4'>
          <SelectList
            label='Muscle Group'
            name='muscleGroup'
            placeholder='-- Select a Muscle Group --'
            items={muscleGroups}
            validationRules={validationRules.muscleGroup}
            data-cy='muscle_group_input'
          />
         
          <div className='mb-4'>
            <LabelInput
              label='Description'
              type='textarea'
              name='description'
              placeholder='Description'
              validationRules={validationRules.description}
              data-cy='description_input'
            />
          </div>

        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            disabled={isSubmitting}
            data-cy='submit_exercise'
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