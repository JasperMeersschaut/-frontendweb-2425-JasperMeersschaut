import useSWR from 'swr';
import { useState ,useEffect} from 'react';
import { getAll } from '../../api';
import ExerciseCard from '../../components/exercises/ExerciseCard.jsx';
import { Link } from 'react-router-dom';

export default function ExercisesList() {
  const { data: exercises, error: exercisesError } = useSWR('exercises', getAll);
  const {data:muscleGroups, error: muscleGroupsError} = useSWR('exercises/muscle-groups',getAll);
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
  if(muscleGroupsError) return <div>Failed to load muscle groups</div>;
  if (!exercises) return <div>Loading...</div>; 
  if(!muscleGroups) return <div>Loading...</div>;

  const filteredExercises = selectedMuscleGroup
    ? exercises.filter((exercise) => exercise.muscleGroup === selectedMuscleGroup)
    : exercises;

  const sortedExercises = filteredExercises.sort((a, b) => a.type.localeCompare(b.type));
  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-4 d-flex justify-content-start">
          <Link to="/exercises/add" className="btn btn-primary">
            Create New Exercise
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <h1 className="text-center">Exercises</h1>
        </div>
        <div className="col-4"></div>
      </div>
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
        {sortedExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};
