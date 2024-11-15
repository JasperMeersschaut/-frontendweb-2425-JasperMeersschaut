import { Link } from 'react-router-dom';
export default function WorkoutCard({ workout }) {
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledExercises = shuffleArray([...workout.items]).slice(0, 4); //Neemt elke keer een willekeurige image

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/workout/${workout.id}` } className="text-decoration-none text-black">
          <div className="card-body">
            <h5 className="card-title">{workout.type}</h5>
            <p className="card-text">Duration: {workout.duration} minutes</p>
            <p className="card-text">Muscle Focus: {workout.muscleFocus}</p>
            <div className="exercise-images">
              {shuffledExercises.map((exercise) => (
                <img
                  key={exercise.id}
                  src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
                  className="exercise-img"
                  alt={exercise.type}
                  onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
                />
              ))}
            </div>
         
          </div> 
        </Link>
      </div>
    </div>
  );
}