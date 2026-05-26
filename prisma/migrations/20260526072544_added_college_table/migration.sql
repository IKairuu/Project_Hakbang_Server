-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "college_image" TEXT NOT NULL,
    "college_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fb_page" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "logo_link" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "program_numbers" INTEGER NOT NULL,
    "program_offered" TEXT[],
    "ranking" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "tags" TEXT[],
    "telephone" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);
