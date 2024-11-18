import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './pages/profile/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import WorkoutList from './pages/workouts/WorkoutList.jsx';
import ExercisesList from './pages/exercises/exercisesList.jsx';
import ExercisesLarge from './pages/exercises/exerciseLarge.jsx';
import WorkoutLarge from './pages/workouts/WorkoutLarge.jsx';
import AddExercise from './pages/exercises/addExercise.jsx';
import Layout from './components/Layout.jsx';
import { AuthProvider } from './contexts/Auth.context.jsx';

const router = createBrowserRouter([{
  element: <Layout />, 
  children: [ {
    path: '/',
    element: <App />,
  },
  { path: 'workouts', element: <WorkoutList /> }, 
  { path: 'exercises', element: <ExercisesList />} , 
  { path: 'exercises/:id', element: <ExercisesLarge />},
  {path: 'exercises/add', element: <AddExercise />},
  {path: 'workout/:id', element: <WorkoutLarge />},
  { path: 'profile', element: <Profile /> }, 
  { path: '*', element: <NotFound /> } ],
},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
);