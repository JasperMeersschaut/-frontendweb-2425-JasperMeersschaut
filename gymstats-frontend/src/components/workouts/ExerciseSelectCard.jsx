import LoremIpsum from 'react-lorem-ipsum';

export default function ExerciseSelectCard({ exercise, isSelected, onSelect }) {
  if (!exercise) return <div>Loading...</div>;

  return (
    <div
      className={`flex flex-col sm:flex-row mb-4 border rounded p-3 h-auto sm:h-48 cursor-pointer ${
        isSelected ? 'bg-blue-100' : ''
      }`}
      onClick={() => onSelect(exercise.id)}
    >
      <div className="w-full sm:w-1/4 h-48 sm:h-full">
        <img
          src={`http://localhost:9000/images/exercises/${exercise.id}.jpg`}
          className="w-full h-full object-contain border border-gray-300"
          alt={exercise.type}
          onError={(e) => (e.target.src = 'http://localhost:9000/images/exercises/default.jpg')}
        />
      </div>
      <div className="w-full sm:w-3/4 pl-0 sm:pl-4 flex flex-col justify-between mt-4 sm:mt-0">
        <div>
          <h5>{exercise.type}</h5>
          <p className="text-gray-700">Muscle Group: {exercise.muscleGroup}</p>
        </div>
        {exercise.description ? (
          <p>{exercise.description}</p>
        ) : (
          <LoremIpsum p={1} />
        )}
      </div>
    </div>
  );
}