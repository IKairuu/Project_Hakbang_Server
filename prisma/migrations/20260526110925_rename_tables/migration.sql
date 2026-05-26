/*
  Warnings:

  - You are about to drop the `Saved_Scholarship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Saved_School` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Saved_Scholarship" DROP CONSTRAINT "Saved_Scholarship_scholarship_id_fkey";

-- DropForeignKey
ALTER TABLE "Saved_Scholarship" DROP CONSTRAINT "Saved_Scholarship_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Saved_School" DROP CONSTRAINT "Saved_School_college_id_fkey";

-- DropForeignKey
ALTER TABLE "Saved_School" DROP CONSTRAINT "Saved_School_user_id_fkey";

-- DropTable
DROP TABLE "Saved_Scholarship";

-- DropTable
DROP TABLE "Saved_School";

-- CreateTable
CREATE TABLE "SavedSchool" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,

    CONSTRAINT "SavedSchool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedScholarship" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scholarship_id" TEXT NOT NULL,

    CONSTRAINT "SavedScholarship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedSchool" ADD CONSTRAINT "SavedSchool_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSchool" ADD CONSTRAINT "SavedSchool_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedScholarship" ADD CONSTRAINT "SavedScholarship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedScholarship" ADD CONSTRAINT "SavedScholarship_scholarship_id_fkey" FOREIGN KEY ("scholarship_id") REFERENCES "Scholarship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
