import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getById } from '../../api';
import WorkoutDetails from '../../components/workouts/WorkoutDetails.jsx';

export default function WorkoutLarge() {
  const { id } = useParams();
  const { data: workout, error } = useSWR(`workouts/${id}`, getById);

  if (error) return <div>Failed to load workout details</div>;
  if (!workout) return <div>Loading...</div>;

  return <WorkoutDetails workout={workout} />;
}