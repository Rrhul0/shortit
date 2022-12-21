/*
  Warnings:

  - You are about to drop the `URL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `path` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "path" DROP CONSTRAINT "path_uRLId_fkey";

-- DropTable
DROP TABLE "URL";

-- DropTable
DROP TABLE "path";

-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "to_url" TEXT NOT NULL,
    "time_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Path" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "urlId" INTEGER,
    "time_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Path_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_id_key" ON "Url"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Path_id_key" ON "Path"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Path_path_key" ON "Path"("path");

-- AddForeignKey
ALTER TABLE "Path" ADD CONSTRAINT "Path_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE SET NULL ON UPDATE CASCADE;
