/*
  Warnings:

  - You are about to drop the column `content` on the `contrat` table. All the data in the column will be lost.
  - Added the required column `comm` to the `ClientContrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comm` to the `Contrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motif` to the `Contrat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientcontrat` ADD COLUMN `comm` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `contrat` DROP COLUMN `content`,
    ADD COLUMN `comm` VARCHAR(191) NOT NULL,
    ADD COLUMN `motif` LONGTEXT NOT NULL;
