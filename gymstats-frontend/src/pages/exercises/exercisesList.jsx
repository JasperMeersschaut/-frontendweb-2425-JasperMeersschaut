import useSWR from 'swr';
import { useState } from 'react';
import { getAll } from '../../api';
import ExerciseCard from '../../components/exercises/ExerciseCard.jsx';

export default function ExercisesList() {
  const { data: exercises, error: exercisesError } = useSWR('exercises', getAll);
  const {data:muscleGroups, error: muscleGroupsError} = useSWR('exercises/muscle-groups',getAll);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');

  if (exercisesError) return <div>Failed to load exercises</div>;
  if(muscleGroupsError) return <div>Failed to load muscle groups</div>;
  if (!exercises) return <div>Loading...</div>; 
  if(!muscleGroups) return <div>Loading...</div>;

  const filteredExercises = selectedMuscleGroup
    ? exercises.filter((exercise) => exercise.muscleGroup === selectedMuscleGroup)
    : exercises;

  return (
    <div className="container mt-5">
      <h1>Exercises</h1>
      <div className="mb-4">
        <h5>Filter by Muscle Group:</h5>
        {muscleGroups.map((group) => (
          <div key={group} className="form-check form-check-inline">
            <input 
              className='btn-check'
              type="radio"
              name="muscleGroup"
              id={`muscleGroup-${group}`}
              value={group}
              checked={selectedMuscleGroup === group}
              onChange={(e) => setSelectedMuscleGroup(e.target.value)}
            />
            <label key={group} className="btn btn-secondary mr-3" htmlFor={`muscleGroup-${group}`}>
              {group}
            </label>
          </div>
        ))}
        <div className="form-check form-check-inline">
          <input
            className="btn-check"
            type="radio"
            name="muscleGroup"
            id="muscleGroup-all"
            value=""
            checked={selectedMuscleGroup === ''}
            onChange={() => setSelectedMuscleGroup('')}
          />
          <label className="btn btn-secondary mr-3" htmlFor="muscleGroup-all">
            All
          </label>
        </div>
      </div>
      <div className="row">
        {filteredExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}