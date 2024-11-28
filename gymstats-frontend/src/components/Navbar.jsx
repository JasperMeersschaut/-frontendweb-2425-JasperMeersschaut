import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../contexts/auth.js';
import { Link } from 'react-router-dom';
// TODO: Add hamburger menu for mobile
export default function Navbar() {
  const {isAuthed} = useAuth();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 text-gray-800">
      <div className="mx-auto flex flex-col sm:flex-row items-start sm:items-center p-4">
        <div className="my-2 sm:my-0 sm:mx-3">
          <NavLink className="text-lg font-medium" to="/">
            Home
          </NavLink>
        </div>
        <div className="my-2 sm:my-0 sm:mx-3">
          <NavLink className="text-lg font-medium" to="/workouts">
            Workouts
          </NavLink>
        </div>
        <div className="my-2 sm:my-0 sm:mx-3">
          <NavLink className="text-lg font-medium" to="/exercises">
            Exercises
          </NavLink>
        </div>
        <div className="my-2 sm:my-0 sm:mx-3">
          <NavLink className="text-lg font-medium" to="/profile" data-cy='profile_btn'>
            Profile
          </NavLink>
        </div>
        {
          // 👇 2
          isAuthed ? (
            // 👇 3
            <div className='nav-item my-2 mx-sm-3 my-sm-0'>
              <Link className='nav-link' to='/logout' data-cy='logout_btn'>
                Logout
              </Link>
            </div>
          ) : (
            // 👇 4
            <div className='nav-item my-2 mx-sm-3 my-sm-0'>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            </div>
          )
        }
        <div className="flex-grow"></div>
        <button className="bg-gray-200 text-gray-800 p-2 rounded-md">LightMode</button> 
        {/* TODO: Light/Darkmode toggle implementation */}
        <NavLink className="ml-4" to="/profile">
          <CgProfile className="text-2xl" />
        </NavLink>
      </div>
    </nav>
  );
}