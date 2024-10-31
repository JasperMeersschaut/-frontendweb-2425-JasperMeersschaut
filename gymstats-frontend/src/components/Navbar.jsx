// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
// import { useContext } from 'react';
// import { IoMoonSharp,IoSunny } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';

export default function Navbar() {
  return (
    <nav className={'navbar sticky-top mb-4 navbar-light bg-light text-bg-light'}>
      <div className='container-fluid flex-column flex-sm-row align-items-start align-items-sm-center'>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/'>
            Home
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/workouts'>
            Workouts
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/exercises'>
            Exercises
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/profile'>
            Profile
          </NavLink>
        </div>
        <div className='flex-grow-1'></div>
        <button className='btn btn-secondary'></button>
        <NavLink className='btn' to='/profile'> 
          <CgProfile />
        </NavLink>
      </div>
    </nav>
  );
}
