/*
  Warnings:

  - You are about to drop the column `path` on the `URL` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "URL" DROP COLUMN "path";

-- CreateTable
CREATE TABLE "path" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "uRLId" INTEGER,

    CONSTRAINT "path_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "path_id_key" ON "path"("id");

-- AddForeignKey
ALTER TABLE "path" ADD CONSTRAINT "path_uRLId_fkey" FOREIGN KEY ("uRLId") REFERENCES "URL"("id") ON DELETE SET NULL ON UPDATE CASCADE;
