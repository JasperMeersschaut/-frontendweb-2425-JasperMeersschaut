import { NavLink } from 'react-router-dom';

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

const ProfileComponent = ({ user, bmiData, contentURL, handleImageError }) => {
  return (
    <div className="container mx-auto text-center mt-5 flex flex-col items-center">
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
        {user?.roles.includes('admin') && (
          <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/user-configuration" 
            data-cy="user_configuration_btn">
            User Configuration
          </NavLink>
        )}
        <NavLink className="btn bg-gray-200 border rounded mb-2 p-2 w-full" to="/logout">
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileComponent;