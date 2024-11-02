// src/data/mock_data.ts

export const EXERCISES = [
  { id: 1, type: 'Squat', muscleGroup: 'Legs' },
  { id: 2, type: 'Bench Press', muscleGroup: 'Chest' },
  { id: 3, type: 'Deadlift', muscleGroup: 'Back' },
  { id: 4, type: 'Pull-up', muscleGroup: 'Back' },
  { id: 5, type: 'Bicep Curl', muscleGroup: 'Arms' },
  { id: 6, type: 'Lunges', muscleGroup: 'Legs' },
  { id: 7, type: 'Shoulder Press', muscleGroup: 'Shoulders' },
  { id: 8, type: 'Tricep Dip', muscleGroup: 'Arms' },
  { id: 9, type: 'Leg Press', muscleGroup: 'Legs' },
  { id: 10, type: 'Lat Pulldown', muscleGroup: 'Back' },
  { id: 11, type: 'Planks', muscleGroup: 'Core' },
  { id: 12, type: 'Burpees', muscleGroup: 'Full Body' },
  { id: 13, type: 'Kettlebell Swing', muscleGroup: 'Legs' },
];
  
export const WORKOUTS = [
  {
    id: 1,
    type: 'Strength',
    duration: 60,
    equipment: 'Barbell',
    muscleFocus: 'Full Body',
    exercises: [1, 2], // Squat, Bench Press
  },
  {
    id: 2,
    type: 'Hypertrophy',
    duration: 45,
    equipment: 'Dumbbells',
    muscleFocus: 'Upper Body',
    exercises: [2, 3], // Bench Press, Deadlift
  },
  {
    id: 3,
    type: 'Endurance',
    duration: 50,
    equipment: 'Bodyweight',
    muscleFocus: 'Full Body',
    exercises: [4, 6], // Pull-up, Lunges
  },
  {
    id: 4,
    type: 'Cardio',
    duration: 30,
    equipment: 'Treadmill',
    muscleFocus: 'Legs',
    exercises: [6, 5], // Lunges, Bicep Curl
  },
  {
    id: 5,
    type: 'Strength',
    duration: 60,
    equipment: 'Dumbbells',
    muscleFocus: 'Upper Body',
    exercises: [2, 7], // Bench Press, Shoulder Press
  },
  {
    id: 6,
    type: 'Strength',
    duration: 50,
    equipment: 'Machines',
    muscleFocus: 'Legs',
    exercises: [9, 1], // Leg Press, Squat
  },
  {
    id: 7,
    type: 'Circuit',
    duration: 45,
    equipment: 'Kettlebell',
    muscleFocus: 'Full Body',
    exercises: [12, 13, 11], // Burpees, Kettlebell Swing, Planks
  },
  {
    id: 8,
    type: 'Hypertrophy',
    duration: 60,
    equipment: 'Cable',
    muscleFocus: 'Back',
    exercises: [10, 3], // Lat Pulldown, Deadlift
  },
];
  
export const USERS = [
  {
    id: 1,
    name: 'Jan Jansen',
    email: 'jan.jansen@example.com',
    sex: 'Male',
    birthdate: '1990-01-01',
    length: 180,
    weight: 75.5,
    plans: [
      {
        days: 3,
        focus: 'Strength Training',
        workouts: [1, 2], // Strength, Hypertrophy
      },
      {
        days: 4,
        focus: 'Legs and Core',
        workouts: [6, 7], // Strength, Circuit
      },
    ],
  },
  {
    id: 2,
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    sex: 'Female',
    birthdate: '1985-05-15',
    length: 165,
    weight: 60.0,
    plans: [
      {
        days: 4,
        focus: 'Hypertrophy',
        workouts: [2], // Hypertrophy
      },
    ],
  },
  {
    id: 3,
    name: 'Pieter De Vries',
    email: 'pieter.devries@example.com',
    sex: 'Male',
    birthdate: '1992-07-20',
    length: 175,
    weight: 70.0,
    plans: [
      {
        days: 5,
        focus: 'Endurance Training',
        workouts: [3, 4], // Endurance, Cardio
      },
      {
        days: 4,
        focus: 'Full Body Hypertrophy',
        workouts: [8], // Hypertrophy
      },
    ],
  },
  {
    id: 4,
    name: 'Sofie Peeters',
    email: 'sofie.peeters@example.com',
    sex: 'Female',
    birthdate: '1988-11-30',
    length: 170,
    weight: 65.0,
    plans: [
      {
        days: 3,
        focus: 'Cardio and Strength',
        workouts: [4, 5], // Cardio, Strength
      },
      {
        days: 3,
        focus: 'Circuit Training',
        workouts: [7], // Circuit
      },
    ],
  },
];
