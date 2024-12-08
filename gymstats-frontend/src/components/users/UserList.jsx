import useSWR from 'swr';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAll, getById, deleteById } from '../../api';
import UserCard from '../../components/users/UserCard.jsx';
import { Link } from 'react-router-dom';
import AsyncData from '../../components/AsyncData.jsx';
import useSWRMutation from 'swr/mutation';
import Error from '../../components/Error.jsx';

export default function UserList() {
  const { data: users = [], isLoading: usersLoading, error: usersError } = useSWR('users', getAll);
  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);
  const { trigger: deleteUser, error: deleteError } = useSWRMutation('users', deleteById);
  <AsyncData loading={usersLoading} error={usersError}>
    console.log(users);
  </AsyncData>;

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    alert('User deleted successfully');
  };

  const currentUserRoles = user?.roles || [];

  return (
    <div className='container mx-auto' data-cy='users_list'>
      <Error error={deleteError} />
      <AsyncData loading={userLoading} error={userError}>
        {user && user.roles.includes('admin') && (
          <div className='flex justify-end'>
            <Link to="/users/add" className="bg-blue-500 text-white font-bold py-2 px-4 rounded" data-cy='create_user_btn'>
              Create New User
            </Link>
          </div>
        )}
      </AsyncData>
      <h1 className="text-3xl font-bold mb-4 mt-3">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-cy='user_list'>
        <AsyncData loading={usersLoading || userLoading} error={usersError || userError}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDeleteUser} currentUserRoles={currentUserRoles} data-cy={`user_card_${user.id}`} />
          ))}
        </AsyncData>
      </div>
    </div>
  );
}