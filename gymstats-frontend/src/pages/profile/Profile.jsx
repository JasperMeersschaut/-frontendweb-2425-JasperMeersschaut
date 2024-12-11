import { useState, useEffect } from 'react';
import { axios, fetchBmi } from '../../api/index.js';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData.jsx';
import ProfileComponent from '../../components/Profile/ProfileComponent.jsx';
import { getById } from '../../api/index.js';

const contentURL = axios.defaults.contentURL;

export default function Profile() {
  const [bmiData, setBmiData] = useState(null);

  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);

  useEffect(() => {
    const fetchBmiData = async () => {
      try {
        const data = await fetchBmi(user.weight, user.length);
        setBmiData(data);
      } catch (error) {
        console.error('Error fetching BMI data:', error);
      }
    };

    if (user) {
      fetchBmiData();
    }
  }, [user]);

  const handleImageError = (e) => {
    e.target.src = `${contentURL}/images/profilePictures/0.jpg`;
  };

  return (
    <>
      <div className="container mx-auto text-center mt-5 flex flex-col items-center">
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
    </>
  );
}