import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getBmi, getById, axios } from '../../api/index.js';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData.jsx';

const contentURL = axios.defaults.contentURL;

export default function Profile() {
  const [bmiData, setBmiData] = useState(null);

  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);

  useEffect(() => {
    const fetchBmi = async () => {
      try {
        const data = await getBmi(user.weight, user.length);
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

  const getBmiColorClass = (category) => {
    switch (category) {
      case 'Normal':
        return 'text-green-500';
      case 'Overweight':
        return 'text-red-500';
      case 'Underweight':
        return 'text-yellow-500';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto text-center mt-5 flex flex-col items-center">
      <AsyncData loading={userLoading} error={userError}>
        {user && (
          <>
            <div className="profile-picture mb-4">
              <img
                src={`${contentURL}/images/profilePictures/${user.id}.jpg`}
                alt="Profile Picture"
                className="rounded-full w-36 h-36"
                onError={handleImageError}
              />
            </div>
            <h3 className="mt-2 text-2xl font-semibold">{user.name} {user.lastName}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-600 text-lg">{user.weight}Kg - {user.length}cm</p>
            <h3 className="mt-4 text-xl font-semibold">BMI</h3>
            {bmiData ? (
              <>
                <p className={`text-lg ${getBmiColorClass(bmiData.bmiCategoryForAdults.category)}`}>
                  BMI: {bmiData.bmi.toFixed(2)}
                </p>
                <p className="text-gray-600 text-lg">Category: {bmiData.bmiCategoryForAdults.category}</p>
                <p className="text-gray-600 text-lg">Your Range: {bmiData.bmiCategoryForAdults.range}</p>
                <p className="text-gray-600 text-lg">Normal Range: {bmiData.bmiCategoryForAdults.normalRange}</p>
              </>
            ) : (
              <p className="text-gray-600 text-lg">Loading...</p>
            )}
          </>
        )}
      </AsyncData>
      <div className="grid gap-2 mt-4 w-full max-w-xs">
        <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/exercises">
          My Exercises
        </NavLink>
        <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/workouts">
          My Workouts
        </NavLink>
        <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/ProfileSettings">
          Profile Settings
        </NavLink>
        <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/logout">
          Logout
        </NavLink>
      </div>
    </div>
  );
}