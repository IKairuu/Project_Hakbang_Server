/*
  Warnings:

  - A unique constraint covering the columns `[college_name]` on the table `College` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "scholarship_name" TEXT NOT NULL,
    "scholarship_icon" TEXT NOT NULL,
    "allowance" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "application_steps" TEXT[],
    "application_timeline" JSONB[],
    "benefits" JSONB[],
    "color" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "eligibility" TEXT[],
    "government" BOOLEAN NOT NULL,
    "grant_title" JSONB NOT NULL,
    "min_gwa" DOUBLE PRECISION NOT NULL,
    "organization_name" JSONB NOT NULL,
    "required_documents" TEXT[],
    "service_obligation" JSONB NOT NULL,
    "tags" TEXT[],
    "likes" INTEGER NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_college_name_key" ON "College"("college_name");
