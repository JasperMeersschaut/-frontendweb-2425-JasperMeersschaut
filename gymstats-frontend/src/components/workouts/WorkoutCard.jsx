import { Link } from 'react-router-dom';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { axios } from '../../api/index.js';

const contentURL = axios.defaults.contentURL;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function WorkoutCard({ workout, onDelete, user, homepage }) {
  const currentUserId = user.id;
  const currentUserRoles = user.roles;
  
  const shuffledExercises = shuffleArray([...workout.items]).slice(0, 4); // Ensure only 4 images are displayed

  const handleDelete = () => {
    if (onDelete) {
      onDelete(workout.id);
    }
  };

  const canEdit = currentUserId === workout.createdBy || currentUserRoles.includes('admin');
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <Link to={`/workout/${workout.id}`} className="no-underline text-black">
        <div className="p-4">
          <h5 className="text-xl font-bold mb-2">{workout.type}</h5>
          <p className="text-gray-700 mb-2">Duration: {workout.duration} minutes</p>
          <p className="text-gray-700 mb-4">Muscle Focus: {workout.muscleFocus}</p>
          <div className="grid grid-cols-2 gap-4">
            {shuffledExercises.map((exercise) => (
              <img
                key={exercise.id}
                src={`${contentURL}/images/exercises/${exercise.id}.jpg`}
                className="w-full h-24 object-contain border border-black"
                alt={exercise.type}
                onError={(e) => (e.target.src = `${contentURL}/images/exercises/default.jpg`)}
              />
            ))}
          </div>
        </div>
      </Link>
      {canEdit && !homepage && (
        <div className="flex justify-end mt-4">
          <Link to={`/workouts/edit/${workout.id}`} className="btn btn-light" data-cy="workout_edit_btn">
            <IoPencilOutline />
          </Link>
          <button className="btn btn-primary ml-2" onClick={handleDelete} data-cy="workout_remove_btn">
            <IoTrashOutline />
          </button>
        </div>
      )}
    </div>
  );
}