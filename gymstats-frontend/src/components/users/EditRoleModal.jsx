import Modal from 'react-modal';

const EditRolesModal = ({ isOpen, onRequestClose, user, isAdmin, handleRoleChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Roles"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Edit Roles for {user.name} {user.lastName}</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={handleRoleChange}
              className="mr-2"
            />
            Admin
          </label>
        </div>
        <button
          onClick={onRequestClose}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default EditRolesModal;