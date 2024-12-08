import UserList from '../components/users/UserList.jsx';
const UserConfiguration = () => {

  return (
    <div className='container mx-auto' data-cy='exercises_list'>  
      <h1 className="text-3xl font-bold mb-4 mt-3">User Configuration</h1>
      <UserList/>
    </div>
  );
};

export default UserConfiguration;