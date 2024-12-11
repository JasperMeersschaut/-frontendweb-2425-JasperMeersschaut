import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { getAll, save, getById } from '../../api/index.js';
import useSWRMutation from 'swr/mutation';
import WorkoutForm from '../../components/workouts/WorkoutForm.jsx';
import AsyncData from '../../components/AsyncData.jsx';

export default function AddOrEditWorkout() {
  const { id } = useParams();

  const {
    data: workout,
    error: workoutError,
    isLoading: workoutsLoading,
  } = useSWR(id ? `workouts/${id}` : null, getById);

  const { trigger: saveWorkout, error: saveError } = useSWRMutation(
    'workouts',
    save,
  );

  const {
    data: muscleFocuses = [],
    error: muscleFocusError,
    isLoading: muscleFocusLoading,
  } = useSWR('workouts/muscle-focuses', getAll);

  const { data: user, isLoading:userLoading,error:userError } = useSWR('users/me',getById);
  console.log('user in addoredit:'+ user);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{id ? 'Edit' : 'Add'} Workout</h1>
      <AsyncData
        error={workoutError || muscleFocusError || saveError ||userError}
        loading={workoutsLoading || muscleFocusLoading ||userLoading}
      >
        <WorkoutForm
          muscleFocuses={muscleFocuses}
          workout={workout}
          saveWorkout={saveWorkout}
          userId={user?.id}
        />
      </AsyncData>
    </div>
  );
}