import useSWR from 'swr';
import { getAll } from '../../api';
import WorkoutCard from '../../components/workouts/WorkoutCard.jsx';

export default function WorkoutList() {
  const { data: workouts, error: workoutError } = useSWR('workouts', getAll);

  if (workoutError) return <div>Failed to load workouts</div>;
  if (!workouts) return <div>Loading...</div>; 

  return (
    <>
      <h1>Workouts</h1>
    
      <div className="row">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id}  workout={workout} />
        ))}
      </div>
    </>
  );
}
    