/*
  Warnings:

  - Made the column `urlId` on table `Path` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Path" DROP CONSTRAINT "Path_urlId_fkey";

-- AlterTable
ALTER TABLE "Path" ALTER COLUMN "urlId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "time_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Path" ADD CONSTRAINT "Path_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
