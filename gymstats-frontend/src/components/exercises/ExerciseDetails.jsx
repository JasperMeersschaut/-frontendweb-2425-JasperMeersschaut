import { LoremIpsum } from 'react-lorem-ipsum';
import { axios } from '../../api/index.js';

const contentURL = axios.defaults.contentURL;

export default function ExerciseDetails({ exercise }) {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-4 mt-3">{exercise.type}</h1>
      <p className="text-xl mb-4">Muscle Group: {exercise.muscleGroup}</p>
      <div className="flex flex-col md:flex-row mb-5">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <img
            src={`${contentURL}/images/exercises/${exercise.id}.jpg`}
            className="w-full h-auto object-contain"
            alt={exercise.type}
            onError={(e) => (e.target.src = `${contentURL}/images/exercises/default.jpg`)}
          /> 
        </div>
        <div className="w-full md:w-2/3 md:pl-4">
          <h5 className="text-2xl font-semibold mb-2">Description</h5>
          {exercise.description ? (
            <p>{exercise.description}</p>
          ) : (
            <LoremIpsum p={1} />
          )}
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-2xl font-semibold mb-2">Instruction Video</h5>
        <video className="w-full" controls>
          <source src={`${contentURL}/videos/exercises/${exercise.id}.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}