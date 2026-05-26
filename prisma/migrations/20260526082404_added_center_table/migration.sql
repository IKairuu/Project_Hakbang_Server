-- CreateTable
CREATE TABLE "Center" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "managed_by" TEXT NOT NULL,
    "about_center" JSONB NOT NULL,
    "program_overvew" JSONB NOT NULL,
    "offers" TEXT[],
    "coverage" TEXT[],
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "exams" TEXT[],
    "best_seller" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "modalities" TEXT NOT NULL,
    "current_price" DOUBLE PRECISION NOT NULL,
    "last_price" DOUBLE PRECISION,
    "phone" TEXT NOT NULL,
    "rating_count" INTEGER NOT NULL,
    "rating_num" DOUBLE PRECISION NOT NULL,
    "stars" TEXT,
    "website" TEXT NOT NULL,
    "beneficiaries" TEXT[],

    CONSTRAINT "Center_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Center_title_key" ON "Center"("title");
