-- CreateTable
CREATE TABLE "URL" (
    "id" SERIAL NOT NULL,
    "path" TEXT,
    "to_url" TEXT NOT NULL,
    "time_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_id_key" ON "URL"("id");
