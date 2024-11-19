import { LoremIpsum } from 'react-lorem-ipsum';
import WorkoutExerciseCard from './WorkoutExerciseCard.jsx';

export default function WorkoutDetails({ workout }) {
  const ids = workout.items.map((item) => item);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-4 mt-3">{workout.type}</h1>
      <p className="text-xl mb-4"><b>Muscle Group:</b>  {workout.muscleFocus}</p>
      <div className="mb-5">
        <p>
          <LoremIpsum p={1} />
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Start Workout
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {ids.map((exercise) => (
          <WorkoutExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}