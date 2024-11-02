/*
  Warnings:

  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan_workout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `plan` DROP FOREIGN KEY `Plan_userId_fkey`;

-- DropForeignKey
ALTER TABLE `plan_workout` DROP FOREIGN KEY `Plan_Workout_PID_fkey`;

-- DropForeignKey
ALTER TABLE `plan_workout` DROP FOREIGN KEY `Plan_Workout_WID_fkey`;

-- DropTable
DROP TABLE `plan`;

-- DropTable
DROP TABLE `plan_workout`;

-- CreateTable
CREATE TABLE `UserWorkout` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `workoutId` INTEGER UNSIGNED NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExerciseDetail` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userWorkoutId` INTEGER UNSIGNED NOT NULL,
    `exerciseId` INTEGER UNSIGNED NOT NULL,
    `reps` INTEGER NOT NULL,
    `sets` INTEGER NOT NULL,
    `weight` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserWorkout` ADD CONSTRAINT `UserWorkout_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkout` ADD CONSTRAINT `UserWorkout_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseDetail` ADD CONSTRAINT `ExerciseDetail_userWorkoutId_fkey` FOREIGN KEY (`userWorkoutId`) REFERENCES `UserWorkout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseDetail` ADD CONSTRAINT `ExerciseDetail_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
