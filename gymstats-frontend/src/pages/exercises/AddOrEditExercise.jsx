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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{id ? 'Edit' : 'Add'} Exercise</h1>
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
    </div>
  );
}