import { Link } from 'react-router-dom';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { axios } from '../../api/index.js';

export default function UserCard({ user, onDelete, currentUserRoles }) {
  const contentURL = axios.defaults.contentURL;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(user.id);
    }
  };

  return (
    <div className="p-4" data-cy={`user_card_${user.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Link to={`/users/${user.id}`} data-cy={`user_link_${user.id}`}>
          <img
            src={`${contentURL}/images/users/${user.id}.jpg`}
            className="w-full h-48 object-contain"
            alt={user.name}
            onError={(e) => (e.target.src = `${contentURL}/images/users/default.jpg`)}
            data-cy={`user_image_${user.id}`}
          />
        </Link>
        <div className="p-4">
          <Link to={`/users/${user.id}`} className="text-lg font-medium text-black no-underline" data-cy={`user_name_${user.id}`}>
            <h5>{user.name} {user.lastName}</h5>
          </Link>
          <p className="text-gray-700" data-cy={`user_email_${user.id}`}>{user.email}</p>
          {currentUserRoles.includes('admin') && (
            <div className="flex justify-end mt-4">
              <Link to={`/users/edit/${user.id}`} className="btn btn-light" data-cy={`user_edit_btn_${user.id}`}>
                <IoPencilOutline />
              </Link>
              <button className="btn btn-primary ml-2" onClick={handleDelete} data-cy={`user_remove_btn_${user.id}`}>
                <IoTrashOutline />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}