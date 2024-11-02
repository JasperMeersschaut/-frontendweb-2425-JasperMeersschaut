-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(0) NOT NULL,
    `length` INTEGER NOT NULL,
    `weight` DOUBLE NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workout` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `equipment` VARCHAR(191) NOT NULL,
    `muscleFocus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercise_Workout` (
    `EID` INTEGER UNSIGNED NOT NULL,
    `WID` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`EID`, `WID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `muscleGroup` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Exercise_Workout` ADD CONSTRAINT `Exercise_Workout_EID_fkey` FOREIGN KEY (`EID`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise_Workout` ADD CONSTRAINT `Exercise_Workout_WID_fkey` FOREIGN KEY (`WID`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkout` ADD CONSTRAINT `UserWorkout_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkout` ADD CONSTRAINT `UserWorkout_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseDetail` ADD CONSTRAINT `ExerciseDetail_userWorkoutId_fkey` FOREIGN KEY (`userWorkoutId`) REFERENCES `UserWorkout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseDetail` ADD CONSTRAINT `ExerciseDetail_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
