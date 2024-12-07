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
import AddOrEditExercise from './pages/exercises/AddOrEditExercise.jsx';
import AddOrEditWorkout from './pages/workouts/AddOrEditWorkout.jsx';
import Layout from './components/Layout.jsx';
import { AuthProvider } from './contexts/Auth.context.jsx';
import Login from './components/login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Logout from './pages/logout.jsx';
import Register from './pages/Register.jsx';
import ProfileSettings from './pages/profile/ProfileSettings.jsx';

const router = createBrowserRouter([{
  element: <Layout />, 
  children: [ 
    { path: '/',element:<PrivateRoute/>, 
      children:[{
        index:true,
        element: <App />,
      },
      ]  }, 
    { path: 'workouts',element:<PrivateRoute/>, 
      children:[{
        index:true,
        element: <WorkoutList />,
      },
      ]  }, 
    { path: 'exercises', element: <PrivateRoute/>,
      children:[{
        index:true,
        element: <ExercisesList />,
      },
      ]},
  
    { path: 'exercises/:id', element: <PrivateRoute/>
      ,children:[{
        index:true,
        element: <ExercisesLarge />,
      }]},
    { path: 'exercises/add',    element:<PrivateRoute/>
      ,children:[{
        index:true,
        element: <AddOrEditExercise />,
      }]},
    { path: 'exercises/edit/:id',    element: <PrivateRoute/>
      ,children:[{
        index:true,
        element: <AddOrEditExercise />,
      }]},

    {path: 'workout/:id', element:<PrivateRoute/>,
      children:[{
        index:true,
        element: <WorkoutLarge />,
      }]},
    { path: 'workouts/add',    element:<PrivateRoute/>
      ,children:[{
        index:true,
        element: <AddOrEditWorkout />,
      }]},
    { path: 'workouts/edit/:id',    element: <PrivateRoute/>
      ,children:[{
        index:true,
        element: <AddOrEditWorkout />,
      }]},
    { path: 'profile', element: <PrivateRoute/>,
      children:[{
        index:true,
        element: <Profile />,
      }]}, 
    {path: 'profileSettings', element: <PrivateRoute/>,
      children:[{
        index:true,
        element: <ProfileSettings />,
      }]},

    { path: '/login', element: <Login /> }, 
    { path: '/logout', element: <Logout /> },
    {    path: '/register',    element: <Register />  }, 
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