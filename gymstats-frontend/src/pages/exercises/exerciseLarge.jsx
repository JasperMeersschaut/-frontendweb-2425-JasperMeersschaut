import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getById } from '../../api';
import ExerciseDetails from '../../components/exercises/ExerciseDetails.jsx';

export default function ExerciseLarge() {
  const { id } = useParams();
  const { data: exercise, error } = useSWR(`exercises/${id}`, getById);

  if (error) return <div>Failed to load exercise details</div>;
  if (!exercise) return <div>Loading...</div>;

  return <ExerciseDetails exercise={exercise} />;
}