import { Link } from 'react-router-dom';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { axios } from '../../api/index.js';

const contentURL = axios.defaults.contentURL;

export default function ExerciseCard({ exercise, onDelete, currentUserRoles, homepage }) {

  const handleDelete = () => {
    if (onDelete) {
      onDelete(exercise.id);
    }
  };

  return (
    <div className="p-4" data-cy={`exercise_card_${exercise.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Link to={`/exercises/${exercise.id}`} data-cy={`exercise_link_${exercise.id}`}>
          <img
            src={`${contentURL}/images/exercises/${exercise.id}.jpg`}
            className="w-full h-48 object-contain"
            alt={exercise.name}
            onError={(e) => (e.target.src = `${contentURL}/images/exercises/default.jpg`)}
            data-cy={`exercise_image_${exercise.id}`}
          />
        </Link>
        <div className="p-4">
          <Link to={`/exercises/${exercise.id}`} className="text-lg font-medium text-black no-underline" 
            data-cy={'exercise_type'}>
            <h5>{exercise.type}</h5>
          </Link>
          <p className="text-gray-700" data-cy={'exercise_muscle_group'}>{exercise.muscleGroup}</p>
          {currentUserRoles.includes('admin') && !homepage && (
            <div className="flex justify-end mt-4">
              <Link to={`/exercises/edit/${exercise.id}`} className="btn btn-light" data-cy={'exercise_edit_btn'}>
                <IoPencilOutline />
              </Link>
              <button className="btn btn-primary ml-2" onClick={handleDelete} data-cy={'exercise_remove_btn'}>
                <IoTrashOutline />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}