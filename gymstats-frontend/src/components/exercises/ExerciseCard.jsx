import { Link } from 'react-router-dom';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { axios } from './index';

export default function ExerciseCard({ exercise, onDelete, currentUserRoles }) {

  const baseURL = axios.defaults.baseURL;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(exercise.id);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Link to={`/exercises/${exercise.id}`}>
          <img
            src={`${baseURL}/images/exercises/${exercise.id}.jpg`}
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
          {currentUserRoles.includes('admin') && (
            <div className="flex justify-end mt-4">
              <Link to={`/exercises/edit/${exercise.id}`} className="btn btn-light" data-cy="exercise_edit_btn">
                <IoPencilOutline />
              </Link>
              <button className="btn btn-primary ml-2" onClick={handleDelete} data-cy="exercise_remove_btn">
                <IoTrashOutline />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}