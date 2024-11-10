import useSWR from 'swr';
import { getAll } from '../../api';
import ExerciseCard from '../../components/exercises/ExerciseCard.jsx';

export default function ExercisesList() {
  const { data: exercises, error } = useSWR('exercises', getAll);

  if (error) return <div>Failed to load exercises</div>;
  if (!exercises) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>Exercises</h1>
      <div className="row">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}