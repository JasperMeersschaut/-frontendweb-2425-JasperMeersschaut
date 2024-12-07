import './App.css';
import { useState, useEffect } from 'react';
import { axios } from './api/index.js';
import useSWR from 'swr';
import AsyncData from './components/AsyncData.jsx';
import ProfileComponent from './components/Profile/ProfileComponent.jsx';
import WorkoutCard from './components/workouts/WorkoutCard.jsx';
import ExerciseCard from './components/exercises/ExerciseCard.jsx';
import { getById,getAll } from './api/index.js';

function App() {
  const contentURL = axios.defaults.contentURL;
  const [bmiData, setBmiData] = useState(null);
  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);
  const { data: workouts = [], isLoading: workoutsLoading, error: workoutError } = useSWR('workouts', getAll);
  const { data: exercises = [], isLoading: exercisesLoading, error: exercisesError } = useSWR('exercises', getAll);

  useEffect(() => {
    const fetchBmi = async () => {
      try {
        const { data } = await axios.get(`/bmi/${user.id}`);
        setBmiData(data);
      } catch (error) {
        console.error('Error fetching BMI data:', error);
      }
    };

    if (user) {
      fetchBmi();
    }
  }, [user]);
  const handleImageError = (e) => {
    e.target.src = `${contentURL}/images/profilePictures/0.jpg`;
  };
  
  return(
    <div className="flex">
      <div className="fixed left-0 top-0 h-full w-1/5 p-4 bg-white shadow-lg overflow-y-auto my-16">
        <h1 className="text-2xl font-bold mb-4">Workouts</h1>
        <div className="flex flex-col gap-6">
          <AsyncData loading={workoutsLoading || userLoading} error={workoutError || userError}>
            {workouts && workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} user={user} homepage={true}  />
            ))}
          </AsyncData>
        </div>
      </div>
      <div className="flex-grow p-4 mx-40">
        <h1 className="text-3xl font-bold mb-4">Exercises</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AsyncData loading={exercisesLoading || userLoading} error={exercisesError || userError}>
            {exercises && exercises.map((exercise) => (
              <div key={exercise.id} className="p-2">
                <ExerciseCard exercise={exercise} currentUserRoles={user.roles} homepage={true} />
              </div>
            ))}
          </AsyncData>
        </div>
      </div>
      <div className="fixed right-0 top-0 h-full w-1/5 flex items-center justify-center p-4 bg-white shadow-lg">
        <AsyncData loading={userLoading} error={userError}>
          {user && (
            <ProfileComponent
              user={user}
              bmiData={bmiData}
              contentURL={contentURL}
              handleImageError={handleImageError}
            />
          )}
        </AsyncData>
      </div>
    </div>
  );
}

export default App;
