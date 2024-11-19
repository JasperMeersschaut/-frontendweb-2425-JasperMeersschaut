import { Link } from 'react-router-dom';

export default function ExerciseCard({ exercise }) {
  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Link to={`/exercises/${exercise.id}`}>
          <img
            src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
            className="w-full h-48 object-contain"
            alt={exercise.name}
            onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
          />
        </Link>
        <div className="p-4">
          <Link to={`/exercises/${exercise.id}`} className="text-lg font-medium text-black no-underline">
            <h5>{exercise.type}</h5>
          </Link>
          <p className="text-gray-700">{exercise.muscleGroup}</p>
        </div>
      </div>
    </div>
  );
}