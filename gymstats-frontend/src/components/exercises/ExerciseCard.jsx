export default function ExerciseCard({ exercise }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img
          src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
          className="card-img-top"
          alt={exercise.name}
          onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
        />
        <div className="card-body">
          <h5 className="card-title">{exercise.type}</h5>
          <p className="card-text">{exercise.muscleGroup}</p>
        </div>
      </div>
    </div>
  );
}