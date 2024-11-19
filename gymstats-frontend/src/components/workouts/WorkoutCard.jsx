import { Link } from 'react-router-dom';

export default function WorkoutCard({ workout }) {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledExercises = shuffleArray([...workout.items]).slice(0, 4); // Neemt elke keer een willekeurige image

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <Link to={`/workout/${workout.id}`} className="no-underline text-black">
        <div className="p-4">
          <h5 className="text-xl font-bold mb-2">{workout.type}</h5>
          <p className="text-gray-700 mb-2">Duration: {workout.duration} minutes</p>
          <p className="text-gray-700 mb-4">Muscle Focus: {workout.muscleFocus}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {shuffledExercises.map((exercise) => (
              <img
                key={exercise.id}
                src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
                className="w-24 h-24 object-contain border border-black"
                alt={exercise.type}
                onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}