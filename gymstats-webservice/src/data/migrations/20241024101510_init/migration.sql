-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(0) NOT NULL,
    `length` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `days` INTEGER NOT NULL,
    `focus` VARCHAR(191) NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan_Workout` (
    `PID` INTEGER UNSIGNED NOT NULL,
    `WID` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`PID`, `WID`)
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

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plan_Workout` ADD CONSTRAINT `Plan_Workout_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plan_Workout` ADD CONSTRAINT `Plan_Workout_WID_fkey` FOREIGN KEY (`WID`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise_Workout` ADD CONSTRAINT `Exercise_Workout_EID_fkey` FOREIGN KEY (`EID`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise_Workout` ADD CONSTRAINT `Exercise_Workout_WID_fkey` FOREIGN KEY (`WID`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
