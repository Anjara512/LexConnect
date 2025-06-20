/*
  Warnings:

  - You are about to drop the `conseiljuridique` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `preventifs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `redaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resolutionlitige` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicepardomaine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `valeurajouter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `conseiljuridique` DROP FOREIGN KEY `ConseilJuridique_userId_fkey`;

-- DropForeignKey
ALTER TABLE `preventifs` DROP FOREIGN KEY `Preventifs_userId_fkey`;

-- DropForeignKey
ALTER TABLE `redaction` DROP FOREIGN KEY `Redaction_userId_fkey`;

-- DropForeignKey
ALTER TABLE `resolutionlitige` DROP FOREIGN KEY `ResolutionLitige_userId_fkey`;

-- DropForeignKey
ALTER TABLE `servicepardomaine` DROP FOREIGN KEY `ServiceParDomaine_userId_fkey`;

-- DropForeignKey
ALTER TABLE `valeurajouter` DROP FOREIGN KEY `ValeurAjouter_userId_fkey`;

-- DropTable
DROP TABLE `conseiljuridique`;

-- DropTable
DROP TABLE `preventifs`;

-- DropTable
DROP TABLE `redaction`;

-- DropTable
DROP TABLE `resolutionlitige`;

-- DropTable
DROP TABLE `servicepardomaine`;

-- DropTable
DROP TABLE `valeurajouter`;
