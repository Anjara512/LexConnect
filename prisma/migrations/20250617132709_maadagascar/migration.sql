/*
  Warnings:

  - Added the required column `budget` to the `ClientContrat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientcontrat` ADD COLUMN `budget` INTEGER NOT NULL;
