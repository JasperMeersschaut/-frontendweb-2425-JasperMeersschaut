import { useState } from 'react';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import EditRolesModal from './EditRoleModal.jsx';

export default function UserCard({ user, onDelete, onUpdateRoles }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.roles.includes('admin'));

  const handleDelete = () => {
    if (onDelete) {
      onDelete(user.id);
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleRoleChange = () => {
    console.log('isAdmin', isAdmin);
    console.log('user.roles', user.roles);
    
    // Ensure user.roles is an array
    const currentRoles = typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles;
    
    const updatedRoles = isAdmin ? currentRoles.filter((role) => role !== 'admin') : [...currentRoles, 'admin'];
    console.log('updatedRoles', updatedRoles);
    
    onUpdateRoles(user.id, updatedRoles.map((role) => role.toLowerCase()));
    setIsAdmin(!isAdmin);
  };

  const roles = typeof user.roles === 'string' ? JSON.parse(user.roles) : user.roles;

  return (
    <div className="p-4" data-cy={`user_card_${user.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center justify-between border-2">
        <div className="flex-grow p-4">
          <div className="text-lg font-medium text-black no-underline" data-cy={`user_name_${user.id}`}>
            <h5>{user.name} {user.lastName}</h5>
          </div>
        </div>
        <div className="flex-grow p-4">
          <p className="text-gray-700" data-cy={`user_email_${user.id}`}>{user.email}</p>
        </div>
        <div className="flex-grow p-4" data-cy={`user_roles_${user.id}`}>
          {roles.sort().map((role, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {role}
            </span>
          ))}
        </div>
        <div className="flex items-center p-4">
          <button className="btn btn-light mr-2" onClick={handleEditClick} data-cy={`user_edit_btn_${user.id}`}>
            <IoPencilOutline />
          </button>
          <button className="btn btn-primary" onClick={handleDelete} data-cy={`user_remove_btn_${user.id}`}>
            <IoTrashOutline />
          </button>
        </div>
      </div>

      <EditRolesModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        user={user}
        isAdmin={isAdmin}
        handleRoleChange={handleRoleChange}
      />
    </div>
  );
}