import useSWR from 'swr';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAll } from '../../api';
import ExerciseCard from '../../components/exercises/ExerciseCard.jsx';
import { Link } from 'react-router-dom';
import AsyncData from '../../components/AsyncData.jsx';

export default function ExercisesList() {
  const { data: exercises = [], isLoading: exercisesLoading, error: exercisesError } = useSWR('exercises', getAll);
  const { data: muscleGroups, isLoading: muscleGroupsLoading, error: muscleGroupsError } 
  = useSWR('exercises/muscle-groups', getAll);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');

  useEffect(() => {
    const muscleGroupFilter = sessionStorage.getItem('muscleGroupFilter');
    if (muscleGroupFilter) {
      setSelectedMuscleGroup(muscleGroupFilter);
    }
  }, []);

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

  const filteredExercises = useMemo(
    () =>
      exercises.filter((t) => {
        return t.muscleGroup.toLowerCase().includes(selectedMuscleGroup.toLocaleLowerCase());
      }),
    [exercises, selectedMuscleGroup],
  );

  const sortedExercises = useMemo(
    () => filteredExercises.sort((a, b) => a.type.localeCompare(b.type)),
    [filteredExercises],
  );

  const handleMuscleGroupChange = useCallback((e) => {
    setSelectedMuscleGroup(e.target.value);
  }, []);

  const handleAllMuscleGroups = useCallback(() => {
    setSelectedMuscleGroup('');
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='flex justify-end'>
        <Link to="/exercises/add" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Create New Exercise
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-3">Exercises</h1>
      <div className="mb-4">
        <h5 className="text-xl font-semibold mb-4">Filter by Muscle Group:</h5>
        <AsyncData loading={muscleGroupsLoading} error={muscleGroupsError}>
          {muscleGroups && muscleGroups.map((group) => (
            <div key={group} className="inline-block mr-3 mt-4 mb-4">
              <input
                className="hidden"
                type="radio"
                name="muscleGroup"
                id={`muscleGroup-${group}`}
                value={group}
                checked={selectedMuscleGroup === group}
                onChange={handleMuscleGroupChange}
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
              onChange={handleAllMuscleGroups}
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
        </AsyncData>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AsyncData loading={exercisesLoading} error={exercisesError}>
          {sortedExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </AsyncData>
      </div>
    </div>
  );
}