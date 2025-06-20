/*
  Warnings:

  - Added the required column `name` to the `ClientNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientnotification` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `notification` ADD COLUMN `name` VARCHAR(191) NULL;
