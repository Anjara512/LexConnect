-- AlterTable
ALTER TABLE `conseiljuridique` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `desc` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `preventifs` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `desc` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `redaction` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `desc` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `resolutionlitige` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `desc` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `servicepardomaine` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `desc` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `valeurajouter` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `desc` LONGTEXT NOT NULL;
