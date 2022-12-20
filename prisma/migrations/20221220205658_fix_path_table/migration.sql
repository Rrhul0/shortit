/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `path` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `path` table without a default value. This is not possible if the table is not empty.

*/
--remove all paths
DELETE FROM "path" WHERE id>0;

-- AlterTable
ALTER TABLE "path" ADD COLUMN     "time_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "path_path_key" ON "path"("path");
