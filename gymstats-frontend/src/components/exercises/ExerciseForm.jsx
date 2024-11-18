import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../LabelInput.jsx';
import SelectList from '../SelectList.jsx';

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
        <LabelInput
          label='Type'
          name='type'
          type='text'
          validationRules={validationRules.type}
          data-cy='type_input'
        />
        <SelectList
          label='Muscle Group'
          name='muscleGroup'
          placeholder='-- Select a muscle group --'
          items={muscleGroups}
          validationRules={validationRules.muscleGroup}
          data-cy='muscle_group_input'
        />
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