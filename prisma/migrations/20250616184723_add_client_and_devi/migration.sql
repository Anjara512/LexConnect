/*
  Warnings:

  - Added the required column `budget` to the `Contrat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contrat` ADD COLUMN `budget` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Devi` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `explication` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientContrat` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motif` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Devi` ADD CONSTRAINT `Devi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Lawyer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientContrat` ADD CONSTRAINT `ClientContrat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
