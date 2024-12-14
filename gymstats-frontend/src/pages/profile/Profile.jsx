import { axios } from '../../api/index.js';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData.jsx';
import ProfileComponent from '../../components/Profile/ProfileComponent.jsx';
import { getById } from '../../api/index.js';

const contentURL = axios.defaults.contentURL;

const handleImageError = (e) => {
  e.target.src = `${contentURL}/images/profilePictures/0.jpg`;
};

export default function Profile() {
  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);
  const {data:bmiData, isLoading:bmiLoading, error:bmiError} = useSWR('bmi', getById);

  return (
    <>
      <div className="container mx-auto text-center mt-5 flex flex-col items-center">
        <AsyncData loading={userLoading || bmiLoading} error={userError ||bmiError}>
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