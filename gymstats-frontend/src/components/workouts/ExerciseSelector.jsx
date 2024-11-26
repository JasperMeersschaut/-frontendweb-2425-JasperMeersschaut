import useSWR from 'swr';
import { getAll } from '../../api/index.js';
import AsyncData from '../../components/AsyncData.jsx';
import ExerciseSelectCard from './ExerciseSelectCard.jsx';

export default function ExerciseSelector({ selectedExercises, setSelectedExercises }) {
  const { data: exercises = [], isLoading: exercisesLoading, error: exercisesError } = useSWR('exercises', getAll);

  const handleSelectExercise = (exerciseId) => {
    const newSelectedExercises = selectedExercises.includes(exerciseId)
      ? selectedExercises.filter((id) => id !== exerciseId)
      : [...selectedExercises, exerciseId];
    setSelectedExercises(newSelectedExercises);
  };

  return (
    <AsyncData loading={exercisesLoading} error={exercisesError}>
      <div className='mt-5'>
        {exercises.map((exercise) => (
          <ExerciseSelectCard
            key={exercise.id}
            exercise={exercise}
            isSelected={selectedExercises.includes(exercise.id)}
            onSelect={handleSelectExercise}
          />
        ))}
      </div>
    </AsyncData>
  );
}