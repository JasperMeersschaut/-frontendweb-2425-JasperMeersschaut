import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getById } from '../../api';
import WorkoutDetails from '../../components/workouts/WorkoutDetails.jsx';
import AsyncData from '../../components/AsyncData.jsx';

export default function WorkoutLarge() {
  const { id } = useParams();
  const { data: workout,isLoading: workoutLoading , error:workoutError } = useSWR(`workouts/${id}`, getById);
  <AsyncData loading={workoutLoading} error={workoutError}>
    return <WorkoutDetails workout={workout} />;
  </AsyncData>;
}