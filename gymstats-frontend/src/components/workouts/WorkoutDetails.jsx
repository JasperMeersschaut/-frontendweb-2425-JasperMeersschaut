import { LoremIpsum } from 'react-lorem-ipsum';
import WorkoutExerciseCard from './WorkoutExerciseCard.jsx';
export default function WorkoutDetails({ workout }) {
  const ids = [];
  workout.items.map((item) => {
    ids.push(item);
  });
  console.log(ids);
  
  return (
    <div className="container mt-5">
      <h1>{workout.type}</h1>
      <p>Muscle Group: {workout.muscleFocus}</p>
      <div className="row">
        <div className="col-md-12 pb-5">
          <p>
            <LoremIpsum p={1} />
          </p>
          <button>
            start workout 
          </button>
        </div>
        <div className="row"></div>
        {ids.map((exercise) => (
          <WorkoutExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}