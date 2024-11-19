import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { getAll } from '../../api';
import ExerciseCard from '../../components/exercises/ExerciseCard.jsx';

export default function ExercisesList() {
  const { data: exercises, error: exercisesError } = useSWR('exercises', getAll);
  const { data: muscleGroups, error: muscleGroupsError } = useSWR('exercises/muscle-groups', getAll);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');

  useEffect(() => {
    const muscleGroupFilter = sessionStorage.getItem('muscleGroupFilter');
    if (muscleGroupFilter) {
      setSelectedMuscleGroup(muscleGroupFilter);
    }
  }, []); //Als muscleGroupFilter in de sessionstorage niet leeg is zet hij de filter op de filter in musclestorage

  useEffect(() => {
    sessionStorage.setItem('muscleGroupFilter', selectedMuscleGroup);
  }, [selectedMuscleGroup]);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }

    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (exercisesError) return <div>Failed to load exercises</div>;
  if (muscleGroupsError) return <div>Failed to load muscle groups</div>;
  if (!exercises) return <div>Loading...</div>;
  if (!muscleGroups) return <div>Loading...</div>;

  const filteredExercises = selectedMuscleGroup
    ? exercises.filter((exercise) => exercise.muscleGroup === selectedMuscleGroup)
    : exercises;

  const sortedExercises = filteredExercises.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <div className='container mx-auto' >
      <h1 className="text-3xl font-bold mb-4 mt-3">Exercises</h1>
      <div className="mb-4">
        <h5 className="text-xl font-semibold mb-4">Filter by Muscle Group:</h5>
        {muscleGroups.map((group) => (
          <div key={group} className="inline-block mr-3 mt-4 mb-4">
            <input
              className="hidden"
              type="radio"
              name="muscleGroup"
              id={`muscleGroup-${group}`}
              value={group}
              checked={selectedMuscleGroup === group}
              onChange={(e) => setSelectedMuscleGroup(e.target.value)}
            />
            <label
              className={`cursor-pointer px-4 py-2 rounded ${
                selectedMuscleGroup === group ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
              htmlFor={`muscleGroup-${group}`}
            >
              {group}
            </label>
          </div>
        ))}
        <div className="inline-block">
          <input
            className="hidden"
            type="radio"
            name="muscleGroup"
            id="muscleGroup-all"
            value=""
            checked={selectedMuscleGroup === ''}
            onChange={() => setSelectedMuscleGroup('')}
          />
          <label
            className={`cursor-pointer px-4 py-2 rounded ${
              selectedMuscleGroup === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            htmlFor="muscleGroup-all"
          >
            All
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}