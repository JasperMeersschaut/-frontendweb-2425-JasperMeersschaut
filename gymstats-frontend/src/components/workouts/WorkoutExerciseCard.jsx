import { Link } from 'react-router-dom';
import LoremIpsum from 'react-lorem-ipsum';
export default function WorkoutExerciseCard({ exercise }) {
  if (!exercise) return <div>Loading...</div>;

  return (
    <div className="row mb-4 border rounded p-3">
      <div className="col-md-2">
        <Link to={`/exercises/${exercise.id}`}>
          <img
            src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
            className="img-fluid"
            alt={exercise.type}
            onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
          />
        </Link>
      </div>
      <div className="col-md-10">
        <Link to={`/exercises/${exercise.id}`} className="text-decoration-none text-black">
          <h5>{exercise.type}</h5>
        </Link>
        <p>Muscle Group: {exercise.muscleGroup}</p>
        <p>
          <LoremIpsum p={1} avgSentencesPerParagraph={2} />
        </p>
      </div>
    </div>
  );
}