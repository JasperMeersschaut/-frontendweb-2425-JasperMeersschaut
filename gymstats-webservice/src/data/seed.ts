import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Creating exercises...');
    // Create Exercises
    const squat = await prisma.exercise.create({
      data: {
        type: 'Squat',
        muscleGroup: 'Legs',
      },
    });
    console.log('Created exercise: Squat');

    const benchPress = await prisma.exercise.create({
      data: {
        type: 'Bench Press',
        muscleGroup: 'Chest',
      },
    });
    console.log('Created exercise: Bench Press');

    const deadlift = await prisma.exercise.create({
      data: {
        type: 'Deadlift',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Deadlift');

    const pullUp = await prisma.exercise.create({
      data: {
        type: 'Pull-up',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Pull-up');

    const bicepCurl = await prisma.exercise.create({
      data: {
        type: 'Bicep Curl',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Bicep Curl');

    const lunges = await prisma.exercise.create({
      data: {
        type: 'Lunges',
        muscleGroup: 'Legs',
      },
    });
    console.log('Created exercise: Lunges');

    const shoulderPress = await prisma.exercise.create({
      data: {
        type: 'Shoulder Press',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Shoulder Press');

    const tricepDip = await prisma.exercise.create({
      data: {
        type: 'Tricep Dip',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Tricep Dip');

    const legPress = await prisma.exercise.create({
      data: {
        type: 'Leg Press',
        muscleGroup: 'Legs',
      },
    });
    console.log('Created exercise: Leg Press');

    const latPulldown = await prisma.exercise.create({
      data: {
        type: 'Lat Pulldown',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Lat Pulldown');

    console.log('Creating users...');
    // Create Users
    const user1 = await prisma.user.create({
      data: {
        name: 'Jan',
        lastName: 'Jansen',
        email: 'jan.jansen@example.com',
        sex: 'Male',
        birthdate: new Date('1990-01-01'),
        length: 180,
        weight: 75.5,
      },
    });
    console.log('Created user: Jan Jansen');

    const user2 = await prisma.user.create({
      data: {
        name: 'Marie',
        lastName: 'Dubois',
        email: 'marie.dubois@example.com',
        sex: 'Female',
        birthdate: new Date('1985-05-15'),
        length: 165,
        weight: 60.0,
      },
    });
    console.log('Created user: Marie Dubois');

    console.log('Creating workouts...');
    // Create Workouts
    const workout1 = await prisma.workout.create({
      data: {
        type: 'Strength',
        duration: 60,
        equipment: 'Barbell',
        muscleFocus: 'Full Body',
      },
    });
    console.log('Created workout: Strength');

    const workout2 = await prisma.workout.create({
      data: {
        type: 'Hypertrophy',
        duration: 45,
        equipment: 'Dumbbells',
        muscleFocus: 'Upper Body',
      },
    });
    console.log('Created workout: Hypertrophy');

    console.log('Creating user workouts...');
    // Create User Workouts
    const userWorkout1 = await prisma.userWorkout.create({
      data: {
        userId: user1.userId,
        workoutId: workout1.id,
        date: new Date(),
        notes: 'Great workout!',
      },
    });
    console.log('Created user workout for Jan Jansen');

    const userWorkout2 = await prisma.userWorkout.create({
      data: {
        userId: user2.userId,
        workoutId: workout2.id,
        date: new Date(),
        notes: 'Felt strong today!',
      },
    });
    console.log('Created user workout for Marie Dubois');

    console.log('Creating exercise details...');
    // Create Exercise Details
    await prisma.exerciseDetail.create({
      data: {
        userWorkoutId: userWorkout1.id,
        exerciseId: squat.id,
        reps: 10,
        sets: 3,
        weight: 100.0,
      },
    });
    console.log('Created exercise detail for Squat in Jan Jansen\'s workout');

    await prisma.exerciseDetail.create({
      data: {
        userWorkoutId: userWorkout1.id,
        exerciseId: deadlift.id,
        reps: 8,
        sets: 4,
        weight: 120.0,
      },
    });
    console.log('Created exercise detail for Deadlift in Jan Jansen\'s workout');

    await prisma.exerciseDetail.create({
      data: {
        userWorkoutId: userWorkout2.id,
        exerciseId: benchPress.id,
        reps: 8,
        sets: 4,
        weight: 80.0,
      },
    });
    console.log('Created exercise detail for Bench Press in Marie Dubois\'s workout');

    await prisma.exerciseDetail.create({
      data: {
        userWorkoutId: userWorkout2.id,
        exerciseId: pullUp.id,
        reps: 12,
        sets: 3,
        weight: 0.0,
      },
    });
    console.log('Created exercise detail for Pull-up in Marie Dubois\'s workout');

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
