import { Outlet,ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar.jsx';

export default function Layout() {
  return (
    <div className='container-xl'>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}