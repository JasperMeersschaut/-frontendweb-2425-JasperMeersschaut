import { LoremIpsum } from 'react-lorem-ipsum';

export default function ExerciseDetails({ exercise }) {
  return (
    <div className="container mt-5">
      <h1>{exercise.type}</h1>
      <p>Muscle Group: {exercise.muscleGroup}</p>
      <div className="row">
        <div className="col-md-4">
          <img
            src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
            className="img-fluid"
            alt={exercise.type}
            onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
          />
        </div>
        <div className="col-md-8">
          <h5>Description</h5>
          <p>
            <LoremIpsum p={1} />
          </p>
        </div>
      </div>
      <div className="instruction-video mt-4">
        <h5>Instruction Video</h5>
        <video width="100%" controls>
          <source src={`http://localhost:9000/videos/exercises/${exercise.id}.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}