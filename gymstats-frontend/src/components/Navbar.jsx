import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../contexts/auth.js';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { isAuthed } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 text-gray-800">
      <div className="mx-auto flex justify-between items-center p-4">
        <NavLink className="text-lg font-medium" to="/" data-cy="home_btn">
          Home
        </NavLink>
        <button
          className="sm:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="hidden sm:flex items-center">
          <button className="bg-gray-200 text-gray-800 p-2 rounded-md">LightMode</button>
          <NavLink className="ml-4" to="/profile" data-cy="profileIcon_btn">
            <CgProfile className="text-2xl" />
          </NavLink>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-start p-4">
          <div className="my-2">
            <NavLink className="text-lg font-medium" to="/workouts" data-cy="workouts_btn">
              Workouts
            </NavLink>
          </div>
          <div className="my-2">
            <NavLink className="text-lg font-medium" to="/exercises" data-cy="exercises_btn">
              Exercises
            </NavLink>
          </div>
          <div className="my-2">
            <NavLink className="text-lg font-medium" to="/profile" data-cy="profile_btn">
              Profile
            </NavLink>
          </div>
          {isAuthed ? (
            <div className="my-2">
              <Link className="text-lg font-medium" to="/logout" data-cy="logout_btn">
                Logout
              </Link>
            </div>
          ) : (
            <div className="my-2">
              <Link className="text-lg font-medium" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}