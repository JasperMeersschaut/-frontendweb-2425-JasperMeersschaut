import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './pages/profile/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import WorkoutList from './pages/workouts/WorkoutList.jsx';
import ExercisesList from './pages/exercises/exercisesList.jsx';
import Layout from './components/Layout.jsx';

const router = createBrowserRouter([{
  element: <Layout />,
  children: [ {
    path: '/',
    element: <App />,
  },
  { path: 'workouts', element: <WorkoutList /> }, 
  { path: 'exercises', element: <ExercisesList /> }, 
  { path: 'profile', element: <Profile /> }, 
  { path: '*', element: <NotFound /> } ],
},
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
