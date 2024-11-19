import { Outlet,ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar.jsx';

export default function Layout() {
  return ( 
    <div>
      <Navbar />
      <div  className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
        <ScrollRestoration />
      </div>
    </div>
  );
}