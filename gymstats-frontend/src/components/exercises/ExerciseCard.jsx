import { Link } from 'react-router-dom';

export default function ExerciseCard({ exercise }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/exercises/${exercise.id}`}>
          <img
            src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
            className="card-img-top"
            alt={exercise.name}
            onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
          />
        </Link>
        <div className="card-body">
          <Link to={`/exercises/${exercise.id}`} className="text-decoration-none text-black" >
            <h5 className="card-title">{exercise.type}</h5>
          </Link>
          <p className="card-text">{exercise.muscleGroup}</p>
        </div>
      </div>
    </div>
  );
}