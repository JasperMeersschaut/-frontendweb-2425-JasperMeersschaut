import useSWR from 'swr';
import { getAll, getById, deleteById, updateRoleById } from '../../api';
import UserCard from '../../components/users/UserCard.jsx';
import AsyncData from '../../components/AsyncData.jsx';
import useSWRMutation from 'swr/mutation';
import Error from '../../components/Error.jsx';

export default function UserList() {
  const { data: users = [], isLoading: usersLoading, error: usersError } = useSWR('users', getAll);
  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);
  const { trigger: deleteUser, error: deleteError } = useSWRMutation('users', deleteById);
  const { trigger: updateUserRole, error: updateError } = useSWRMutation('users', updateRoleById);

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    alert('User deleted successfully');
  };

  const handleUpdateUserRole = async (id, roles) => {
    await updateUserRole({ id, roles });
  };

  const currentUserRoles = user?.roles || [];

  return (
    <div className='container mx-auto' data-cy='users_list'>
      <Error error={deleteError || updateError} />
      <div className="grid grid-cols-1" data-cy='user_list'>
        <AsyncData loading={usersLoading || userLoading} error={usersError || userError}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDeleteUser}
              onUpdateRoles={handleUpdateUserRole}
              currentUserRoles={currentUserRoles}
              data-cy={`user_card_${user.id}`}
            />
          ))}
        </AsyncData>
      </div>
    </div>
  );
}