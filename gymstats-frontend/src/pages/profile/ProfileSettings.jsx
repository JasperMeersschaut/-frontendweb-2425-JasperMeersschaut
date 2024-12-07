import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { getAll, save, getById } from '../../api';
import useSWRMutation from 'swr/mutation';
import UserForm from '../../components/users/UserForm.jsx';
import AsyncData from '../../components/AsyncData';

export default function ProfileSettings() {
  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);

  const { trigger: saveUser, error: saveError } = useSWRMutation(
    'users',
    save,
  );

  return (
    <>
      <h1> User settings</h1>
      <AsyncData
        error={userError  || saveError}
        loading={userLoading}
      >
        <UserForm
          user={user}
          saveUser={saveUser}
        />
      </AsyncData>
    </>
  );
}