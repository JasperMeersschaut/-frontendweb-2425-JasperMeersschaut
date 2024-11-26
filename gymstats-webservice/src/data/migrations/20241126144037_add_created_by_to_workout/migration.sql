-- AlterTable
ALTER TABLE `workout` ADD COLUMN `createdBy` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
