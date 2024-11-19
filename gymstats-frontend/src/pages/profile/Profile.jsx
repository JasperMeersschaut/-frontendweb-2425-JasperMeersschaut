import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context.jsx';
import { NavLink } from 'react-router-dom';

export default function Profile() {
  const {user} = useContext(AuthContext);
  const handleImageError = (e) => {
    e.target.src = '../../../public/images/0.jpg';
  };

  return (
    <>
      <div className="container mx-auto text-center mt-5 flex flex-col items-center">
        <div className="profile-picture mb-4">
          <img
            src={`http://localhost:9000/images/profilePictures/${user.userId}.jpg`}
            alt="Profile Picture"
            className="rounded-full w-36 h-36"
            onError={handleImageError}
          />
        </div>
        <h3 className="mt-2 text-2xl font-semibold">{user.name}</h3>
        <div className="grid gap-2 mt-4 w-full max-w-xs">
          <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/exercises">
            My Exercises
          </NavLink>
          <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/workouts">
            My Workouts
          </NavLink>
          <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/stats">
            My Stats
          </NavLink>
          <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/logout">
            Logout
          </NavLink>
        </div>
      </div>
          
      {/* TODO: aanpassen een keer er authenticatie is */} 
    </>
  );
}