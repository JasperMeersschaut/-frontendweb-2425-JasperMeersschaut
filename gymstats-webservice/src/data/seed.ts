import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const squat = await prisma.exercise.create({
    data: {
      type: 'Squat',
      muscleGroup: 'Legs',
    },
  });

  const benchPress = await prisma.exercise.create({
    data: {
      type: 'Bench Press',
      muscleGroup: 'Chest',
    },
  });

  const deadlift = await prisma.exercise.create({
    data: {
      type: 'Deadlift',
      muscleGroup: 'Back',
    },
  });

  const pullUp = await prisma.exercise.create({
    data: {
      type: 'Pull-up',
      muscleGroup: 'Back',
    },
  });

  const bicepCurl = await prisma.exercise.create({
    data: {
      type: 'Bicep Curl',
      muscleGroup: 'Arms',
    },
  });

  const lunges = await prisma.exercise.create({
    data: {
      type: 'Lunges',
      muscleGroup: 'Legs',
    },
  });

  const shoulderPress = await prisma.exercise.create({
    data: {
      type: 'Shoulder Press',
      muscleGroup: 'Shoulders',
    },
  });

  const tricepDip = await prisma.exercise.create({
    data: {
      type: 'Tricep Dip',
      muscleGroup: 'Arms',
    },
  });

  const legPress = await prisma.exercise.create({
    data: {
      type: 'Leg Press',
      muscleGroup: 'Legs',
    },
  });

  const latPulldown = await prisma.exercise.create({
    data: {
      type: 'Lat Pulldown',
      muscleGroup: 'Back',
    },
  });

  const planks = await prisma.exercise.create({
    data: {
      type: 'Planks',
      muscleGroup: 'Core',
    },
  });

  const burpees = await prisma.exercise.create({
    data: {
      type: 'Burpees',
      muscleGroup: 'Full Body',
    },
  });

  const kettlebellSwing = await prisma.exercise.create({
    data: {
      type: 'Kettlebell Swing',
      muscleGroup: 'Legs',
    },
  });

  const workout1 = await prisma.workout.create({
    data: {
      type: 'Strength',
      duration: 60,
      equipment: 'Barbell',
      muscleFocus: 'Full Body',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: squat.id } } },
          { exercise: { connect: { id: benchPress.id } } },
        ],
      },
    },
  });

  const workout2 = await prisma.workout.create({
    data: {
      type: 'Hypertrophy',
      duration: 45,
      equipment: 'Dumbbells',
      muscleFocus: 'Upper Body',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: benchPress.id } } },
          { exercise: { connect: { id: deadlift.id } } },
        ],
      },
    },
  });

  const workout3 = await prisma.workout.create({
    data: {
      type: 'Endurance',
      duration: 50,
      equipment: 'Bodyweight',
      muscleFocus: 'Full Body',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: pullUp.id } } },
          { exercise: { connect: { id: lunges.id } } },
        ],
      },
    },
  });

  const workout4 = await prisma.workout.create({
    data: {
      type: 'Cardio',
      duration: 30,
      equipment: 'Treadmill',
      muscleFocus: 'Legs',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: lunges.id } } },
          { exercise: { connect: { id: bicepCurl.id } } },
        ],
      },
    },
  });

  const workout5 = await prisma.workout.create({
    data: {
      type: 'Strength',
      duration: 60,
      equipment: 'Dumbbells',
      muscleFocus: 'Upper Body',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: benchPress.id } } },
          { exercise: { connect: { id: shoulderPress.id } } },
        ],
      },
    },
  });

  const workout6 = await prisma.workout.create({
    data: {
      type: 'Strength',
      duration: 50,
      equipment: 'Machines',
      muscleFocus: 'Legs',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: legPress.id } } },
          { exercise: { connect: { id: squat.id } } },
        ],
      },
    },
  });

  const workout7 = await prisma.workout.create({
    data: {
      type: 'Circuit',
      duration: 45, 
      equipment: 'Kettlebell',
      muscleFocus: 'Full Body',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: burpees.id } } },
          { exercise: { connect: { id: kettlebellSwing.id } } },
          { exercise: { connect: { id: planks.id } } },
        ],
      },
    },
  });

  const workout8 = await prisma.workout.create({
    data: {
      type: 'Hypertrophy',
      duration: 60, // minutes
      equipment: 'Cable',
      muscleFocus: 'Back',
      exerciseWorkouts: {
        create: [
          { exercise: { connect: { id: latPulldown.id } } },
          { exercise: { connect: { id: deadlift.id } } },
        ],
      },
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'Jan',
      lastName: 'Jansen',
      email: 'jan.jansen@example.com',
      sex: 'Male',
      birthdate: new Date('1990-01-01'),
      length: 180,
      weight: 75.5,
      plans: {
        create: [
          {
            days: 3,
            focus: 'Strength Training',
            workouts: {
              create: [
                { workout: { connect: { id: workout1.id } } },
                { workout: { connect: { id: workout2.id } } },
              ],
            },
          },
          {
            days: 4,
            focus: 'Legs and Core',
            workouts: {
              create: [
                { workout: { connect: { id: workout6.id } } }, // Strength
                { workout: { connect: { id: workout7.id } } }, // Circuit
              ],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Marie',
      lastName: 'Dubois',
      email: 'marie.dubois@example.com',
      sex: 'Female',
      birthdate: new Date('1985-05-15'),
      length: 165,
      weight: 60.0,
      plans: {
        create: [
          {
            days: 4,
            focus: 'Hypertrophy',
            workouts: {
              create: [
                { workout: { connect: { id: workout2.id } } },
              ],
            },
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Pieter',
      lastName: 'De Vries',
      email: 'pieter.devries@example.com',
      sex: 'Male',
      birthdate: new Date('1992-07-20'),
      length: 175,
      weight: 70.0,
      plans: {
        create: [
          {
            days: 5,
            focus: 'Endurance Training',
            workouts: {
              create: [
                { workout: { connect: { id: workout3.id } } },
                { workout: { connect: { id: workout4.id } } },
              ],
            },
          },
          {
            days: 4,
            focus: 'Full Body Hypertrophy',
            workouts: {
              create: [
                { workout: { connect: { id: workout8.id } } }, // Hypertrophy
              ],
            },
          },
        ],
      },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Sofie',
      lastName: 'Peeters',
      email: 'sofie.peeters@example.com',
      sex: 'Female',
      birthdate: new Date('1988-11-30'),
      length: 170,
      weight: 65.0,
      plans: {
        create: [
          {
            days: 3,
            focus: 'Cardio and Strength',
            workouts: {
              create: [
                { workout: { connect: { id: workout4.id } } },
                { workout: { connect: { id: workout5.id } } },
              ],
            },
          },
          {
            days: 3,
            focus: 'Circuit Training',
            workouts: {
              create: [
                { workout: { connect: { id: workout7.id } } }, // Circuit
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ user1, user2, user3, user4 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
