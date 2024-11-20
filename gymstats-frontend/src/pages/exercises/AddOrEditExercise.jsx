import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { getAll, save, getById } from '../../api/index.js';
import useSWRMutation from 'swr/mutation';
import ExerciseForm from '../../components/exercises/ExerciseForm.jsx';
import AsyncData from '../../components/AsyncData.jsx';

export default function AddOrEditExercise() {
  const { id } = useParams();

  const {
    data: exercise,
    error: exerciseError,
    isLoading: exerciseLoading,
  } = useSWR(id ? `exercises/${id}` : null, getById);

  const { trigger: saveExercise, error: saveError } = useSWRMutation(
    'exercises',
    save,
  );

  const {
    data: muscleGroups = [],
    error: muscleGroupsError,
    isLoading: muscleGroupsLoading,
  } = useSWR('exercises/muscle-groups', getAll);

  return (
    <>
      <h1>{id ? 'Edit' : 'Add'} exercise</h1>
      <AsyncData
        error={exerciseError || muscleGroupsError || saveError}
        loading={exerciseLoading || muscleGroupsLoading}
      >
        <ExerciseForm
          muscleGroups={muscleGroups}
          exercise={exercise}
          saveExercise={saveExercise}
        />
      </AsyncData>
    </>
  );
}