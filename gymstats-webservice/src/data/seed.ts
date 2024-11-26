import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../core/password';
import Role from '../core/roles';
const prisma = new PrismaClient();

async function main() {
  try {
    const passwordHash = await hashPassword('12345678');
    console.log('Creating exercises...');
    // Create Exercises
    // arm exercises
    console.log('Creating arm exercises...');

    const alternatingHammerCurl = await prisma.exercise.create({
      data: {
        id: 1,
        type: 'Alternating Hammer Curl',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Alternating Hammer Curl');

    const barbelSkullcrusher = await prisma.exercise.create({
      data: {
        id: 2,
        type: 'Barbell Skullcrusher',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Barbell Skullcrusher');

    const cableHammerCurl = await prisma.exercise.create({
      data: {
        id: 3,
        type: 'Cable Hammer Curl',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Cable Hammer Curl');

    const dumbellSingleArmTricepExtension = await prisma.exercise.create({
      data: {
        id: 4,
        type: 'Dumbell Single Arm Tricep Extension',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Dumbell Single Arm Tricep Extension');

    const ezBarBicepCurl = await prisma.exercise.create({
      data: {
        id: 5,
        type: 'EZ-Bar Bicep Curl',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: EZ-Bar Bicep Curl');

    const ezBarPreacherCurl = await prisma.exercise.create({
      data: {
        id: 6,
        type: 'EZ-Bar Preacher Curl',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: EZ-Bar Preacher Curl');

    const hammerCurl = await prisma.exercise.create({
      data: {
        id: 7,
        type: 'Hammer Curl',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Hammer Curl');

    const seatedDumbellBicepCurl = await prisma.exercise.create({
      data: {
        id: 8,
        type: 'Seated Dumbell Bicep Curl',
        muscleGroup: 'Arms',
      },
    });
    console.log('Created exercise: Seated Dumbell Bicep Curl');
    console.log('Created arm exercises');
    console.log('Creating back exercises...');
    // back exercises
    const assistedPullup = await prisma.exercise.create({
      data: {
        id: 9,
        type: 'Assisted Pull-up',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Assisted Pull-up');

    const barbelBentOverRow = await prisma.exercise.create({
      data: {
        id: 10,
        type: 'Barbell Bent Over Row',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Barbell Bent Over Row');

    const barbellDeadlift = await prisma.exercise.create({
      data: {
        id: 11,
        type: 'Barbell Deadlift',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Barbell Deadlift');

    const cableRearDeltFly = await prisma.exercise.create({
      data: {
        id: 12,
        type: 'Cable Rear Delt Fly',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Cable Rear Delt Fly');

    const dumbellSingleArmRows = await prisma.exercise.create({
      data: {
        id: 13,
        type: 'Dumbell Single Arm Rows',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Dumbell Single Arm Rows');

    const latPulldown = await prisma.exercise.create({
      data: {
        id: 14,
        type: 'Lat Pulldown',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Lat Pulldown');

    const pullUp = await prisma.exercise.create({
      data: {
        id: 15,
        type: 'Pull-up',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Pull-up');

    const seatedCableRow = await prisma.exercise.create({
      data: {
        id: 16,
        type: 'Seated Cable Row',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Seated Cable Row');

    const seatedRearDeltFly = await prisma.exercise.create({
      data: {
        id: 17,
        type: 'Seated Rear Delt Fly',
        muscleGroup: 'Back',
      },
    });
    console.log('Created exercise: Seated Rear Delt Fly');
    console.log('Created back exercises');
    console.log('Creating chest exercises...');
    // chest exercises
    const benchPress = await prisma.exercise.create({
      data: {
        id: 18,
        type: 'Bench Press',
        muscleGroup: 'Chest',
      },
    });
    console.log('Created exercise: Bench Press');

    const highCableChestFly = await prisma.exercise.create({
      data: {
        id: 19,
        type: 'High Cable Chest Fly',
        muscleGroup: 'Chest',
      },
    });
    console.log('Created exercise: High Cable Chest Fly');

    const dumbellChestFly = await prisma.exercise.create({
      data: {
        id: 20,
        type: 'Dumbell Chest Fly',
        muscleGroup: 'Chest',
      },
    });
    console.log('Created exercise: Dumbell Chest Fly');

    const dumbellInclineBenchPress = await prisma.exercise.create({
      data: {
        id: 21,
        type: 'Dumbell Incline Bench Press',
        muscleGroup: 'Chest',
      },
    });
    console.log('Created exercise: Dumbell Incline Bench Press');

    const dumbellInclineChestFly = await prisma.exercise.create({
      data: {
        id: 22,
        type: 'Dumbell Incline Chest Fly',
        muscleGroup: 'Chest',
      },
    });
    console.log('Created exercise: Dumbell Incline Chest Fly');
    console.log('Created chest exercises');
    console.log('Creating shoulder exercises...');
    // shoulder exercises
    const barbelOverheadPress = await prisma.exercise.create({
      data: {
        id: 23,
        type: 'Barbell Overhead Press',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Barbell Overhead Press');
    const battleRopeSlam = await prisma.exercise.create({
      data: {
        id: 24,
        type: 'Battle Rope Slam',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Battle Rope Slam');
    const cableFacePull = await prisma.exercise.create({
      data: {
        id: 25,
        type: 'Cable Face Pull',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Cable Face Pull');
    const cableFrontDeltRaise = await prisma.exercise.create({
      data: {
        id: 26,
        type: 'Cable Front Delt Raise',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Cable Front Delt Raise');
    const cableUprightRow = await prisma.exercise.create({
      data: {
        id: 27,
        type: 'Cable Upright Row',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Cable Upright Row');
    const dumbellLateralRaise = await prisma.exercise.create({
      data: {
        id: 28,
        type: 'Dumbell Lateral Raise',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Dumbell Lateral Raise');
    const rearDeltPecDeckFly = await prisma.exercise.create({
      data: {
        id: 29,
        type: 'Rear Delt Pec Deck Fly',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Rear Delt Pec Deck Fly');
    const seatedDumbellShoulderPress = await prisma.exercise.create({
      data: {
        id: 30,
        type: 'Seated Dumbell Shoulder Press',
        muscleGroup: 'Shoulders',
      },
    });
    console.log('Created exercise: Seated Dumbell Shoulder Press');
    console.log('Created shoulder exercises');
    
    console.log('Creating users...');
    // Create Users
    const user1 = await prisma.user.create({
      data: {
        name: 'Jasper',
        lastName: 'Meersschaut',
        email: 'meersschaut.jasper@gmail.com',
        sex: 'Male',
        birthdate: new Date('2005-01-16'),
        length: 177,
        weight: 73,
        password_hash: passwordHash,
        roles:JSON.stringify([Role.ADMIN, Role.USER]),
      },
    });
    console.log('Created user: Jasper Meersschaut');

    const user2 = await prisma.user.create({
      data: {
        name: 'Marie',
        lastName: 'Dubois',
        email: 'marie.dubois@example.com',
        sex: 'Female',
        birthdate: new Date('1985-05-15'),
        length: 165,
        weight: 60.0,
        password_hash: passwordHash,
        roles: JSON.stringify([ Role.USER]),
      },
    });
    console.log('Created user: Marie Dubois');

    console.log('Creating workouts...');
    // Create Workouts
    const workout1 = await prisma.workout.create({
      data: {
        type: 'Push',
        duration: 120,
        muscleFocus: 'Upper Body',
        items: {
          connect: [{ id: 21 }, { id: 21 }, { id: 19 },{id:30},{id:28},{id:4},{id:2}],
        },
        createdBy:null,
      },
    });
    console.log('Created workout: Push');

    const workout2 = await prisma.workout.create({
      data: {
        type: 'Pull',
        duration: 90,
        muscleFocus: 'Upper Body',
        items: {
          connect: [{ id: 16 }, { id: 14 }, { id: 17 }, { id: 1 }, { id: 6 }],
        },
        createdBy:1,
      },
    });
    console.log('Created workout: Hypertrophy');

    console.log('Creating user workouts...');
    // Create User Workouts
    const userWorkout1 = await prisma.userWorkout.create({
      data: {
        userId: user1.id,
        workoutId: workout1.id,
        date: new Date(),
        notes: 'Great workout!',
      },
    });
    console.log('Created user workout for Jan Jansen');

    const userWorkout2 = await prisma.userWorkout.create({
      data: {
        userId: user2.id,
        workoutId: workout2.id,
        date: new Date(),
        notes: 'Felt strong today!',
      },
    });
    console.log('Created user workout for Marie Dubois');

    console.log('Creating exercise details...');

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
