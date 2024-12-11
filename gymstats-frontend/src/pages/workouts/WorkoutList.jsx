import useSWR from 'swr';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAll, deleteById, getById } from '../../api';
import WorkoutCard from '../../components/workouts/WorkoutCard.jsx';
import AsyncData from '../../components/AsyncData.jsx';
import { Link } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import Error from '../../components/Error.jsx';
import { FiPlus } from 'react-icons/fi';

export default function WorkoutList() {
  const { data: workouts = [], isLoading: workoutsLoading, error: workoutError } = useSWR('workouts', getAll);
  const { data: muscleFocuses, isLoading: muscleFocusesLoading, error: muscleFocusesError } = useSWR('workouts/muscle-focuses', getAll);
  const { data: user, isLoading: userLoading, error: userError } = useSWR('users/me', getById);
  const { trigger: deleteWorkout, error: deleteError } = useSWRMutation('workouts', deleteById);

  const [minDuration, setMinDuration] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [selectedMuscleFocus, setSelectedMuscleFocus] = useState('');

  useEffect(() => {
    const durationFilter = sessionStorage.getItem('durationFilter');
    if (durationFilter) {
      const [min, max] = durationFilter.split('-');
      setMinDuration(min);
      setMaxDuration(max);
    }
    const muscleFocusFilter = sessionStorage.getItem('muscleFocusFilter');
    if (muscleFocusFilter) {
      setSelectedMuscleFocus(muscleFocusFilter);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('durationFilter', `${minDuration}-${maxDuration}`);
    sessionStorage.setItem('muscleFocusFilter', selectedMuscleFocus);
  }, [minDuration, maxDuration, selectedMuscleFocus]);

  const filteredWorkouts = useMemo(
    () =>
      workouts.filter((workout) => {
        const duration = parseInt(workout.duration, 10);
        const min = parseInt(minDuration, 10);
        const max = parseInt(maxDuration, 10);
        const durationMatch = (!min || duration >= min) && (!max || duration <= max);
        const muscleFocusMatch = !selectedMuscleFocus || workout.muscleFocus === selectedMuscleFocus;
        return durationMatch && muscleFocusMatch;
      }),
    [workouts, minDuration, maxDuration, selectedMuscleFocus],
  );

  const handleDeleteWorkout = useCallback(async (id) => {
    await deleteWorkout(id);
    alert('Workout is removed');
  }, [deleteWorkout]);

  const handleMinDurationChange = useCallback((e) => {
    setMinDuration(e.target.value);
  }, []);

  const handleMaxDurationChange = useCallback((e) => {
    setMaxDuration(e.target.value);
  }, []);

  const handleMuscleFocusChange = useCallback((e) => {
    setSelectedMuscleFocus(e.target.value);
  }, []);

  return (
    <div className="container mx-auto p-1">
      <Error error={deleteError} />
      <div className="flex justify-end mb-4">
        <Link to="/workouts/add" className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center">
          <span className="hidden sm:inline">Create New Workout</span>
          <FiPlus className="sm:hidden text-2xl" />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center">Workouts</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
          <input
            type="number"
            placeholder="Min Duration (min)"
            value={minDuration}
            onChange={handleMinDurationChange}
            className="border rounded px-4 py-2 w-full sm:w-auto"
          />
          <input
            type="number"
            placeholder="Max Duration (min)"
            value={maxDuration}
            onChange={handleMaxDurationChange}
            className="border rounded px-4 py-2 w-full sm:w-auto"
          />
        </div>
        <AsyncData loading={muscleFocusesLoading} error={muscleFocusesError}>
          <select
            value={selectedMuscleFocus}
            onChange={handleMuscleFocusChange}
            className="border rounded px-4 py-2 w-full sm:w-auto"
          >
            <option value="">All</option>
            {muscleFocuses && muscleFocuses.map((focus) => (
              <option key={focus} value={focus}>
                {focus}
              </option>
            ))}
          </select>
        </AsyncData>
      </div>
      <div className="grid min-w-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AsyncData loading={workoutsLoading || userLoading} error={workoutError || userError}>
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} onDelete={handleDeleteWorkout} user={user} />
          ))}
        </AsyncData>
      </div>
    </div>
  );
}