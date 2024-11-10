import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context.jsx';
import { NavLink } from 'react-router-dom';

export default function Profile() {
  const {user} = useContext(AuthContext);
  const handleImageError = (e) => {
    e.target.src = '../../../public/images/0.jpg';
  };
  return( <>

    <div className="container text-center mt-5">
      <div className="profile-picture">
        <img
          src={`http://localhost:9000/images/profilePictures/${user.userId}.jpg`}
          alt="Profile Picture"
          className="rounded-circle"
          width="150"
          height="150"
          onError={handleImageError}
        />
      </div>
      <h3 className="mt-2">{user.name}</h3>
      <div className='d-grid gap-2'>
        <NavLink className='btn btn-light border rounded mb-2 p-2 px-5' to='/exercises'>
          My Exercises
        </NavLink>
        <NavLink className='btn btn-light border rounded mb-2 p-2 px-5' to='/workouts'>
          My Workouts
        </NavLink>
        <NavLink className='btn btn-light border rounded mb-2 p-2 px-5' to='/stats'>
          My Stats
        </NavLink>
        <NavLink className='btn btn-light border rounded mb-2 p-2 px-5' to='/exercises'>
          Logout
        </NavLink>
      </div>
    </div>
    
    {/* TODO: aanpassen een keer er authenticatie is */} 
  </>
  );
}