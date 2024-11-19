import useSWR from 'swr';
import { getAll } from '../../api';
import WorkoutCard from '../../components/workouts/WorkoutCard.jsx';

export default function WorkoutList() {
  const { data: workouts, error: workoutError } = useSWR('workouts', getAll);

  if (workoutError) return <div>Failed to load workouts</div>;
  if (!workouts) return <div>Loading...</div>; 

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mt-3">Workouts</h1>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </>
  );
}