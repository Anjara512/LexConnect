/*
  Warnings:

  - Added the required column `key` to the `ClientContrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ClientContrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Contrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Contrat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientcontrat` ADD COLUMN `key` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `contrat` ADD COLUMN `key` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
