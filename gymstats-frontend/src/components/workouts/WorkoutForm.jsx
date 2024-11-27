import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../LabelInput.jsx';
import SelectList from '../SelectList.jsx';
import AsyncData from '../../components/AsyncData.jsx';
import ExerciseSelector from './ExerciseSelector.jsx';
import { useState } from 'react';

const EMPTY_WORKOUT = {
  id: undefined,
  type: '',
  muscleFocus: '',
  duration: '',
  createdBy: '',
  items: [],
};

export default function WorkoutForm({ muscleFocuses = [], workout = EMPTY_WORKOUT, saveWorkout }) {
  const validationRules = {
    type: {
      required: 'Type is required',
    },
    muscleFocus: {
      required: 'Muscle Focus is required',
    },
    duration: {
      required: 'Duration is required',
      min: {
        value: 1,
        message: 'Duration must be at least 1 minute',
      },
    },
  };
  const navigate = useNavigate();
  const [selectedExercises, setSelectedExercises] = useState(workout.items.map((item) => item.id) || []);

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      type: workout?.type,
      muscleFocus: workout?.muscleFocus,
      duration: workout?.duration,
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    if (!isValid) return;
    try {
      await saveWorkout({
        id: workout?.id,
        ...values,
        items: selectedExercises.map((id) => ({ id })), // Include the selected exercises
      });
      navigate('/workouts');
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <AsyncData loading={isSubmitting} error={null}>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
          <div className='mb-4'>
            <LabelInput
              label='Type'
              type='text'
              name='type'
              placeholder='Type'
              validationRules={validationRules.type}
            />
          </div>
          <div className='mb-4'>
            <LabelInput
              label='Duration (minutes)'
              type='number'
              name='duration'
              placeholder='Duration'
              validationRules={validationRules.duration}
            />
          </div>
          <div className='mb-4'>
            <SelectList
              label='Muscle Focus'
              name='muscleFocus'
              placeholder='-- Select a Muscle Focus --'
              items={muscleFocuses}
              validationRules={validationRules.muscleFocus}
            />
          </div>
          <ExerciseSelector selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} />

          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 
              text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              data-cy='submit_exercise'
              disabled={isSubmitting}
            >
              {workout?.id ? 'Save Exercise' : 'Add Exercise'}
            </button>
            <Link
              disabled={isSubmitting}
              className='ml-4 bg-gray-200 hover:bg-gray-300 
              text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              to='/workouts'
            >
              Cancel
            </Link>
          </div>
        </form>
      </AsyncData>
    </FormProvider>
  );
}