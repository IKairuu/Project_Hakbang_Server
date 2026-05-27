/*
  Warnings:

  - You are about to drop the column `best_seller` on the `Center` table. All the data in the column will be lost.
  - You are about to drop the column `program_overvew` on the `Center` table. All the data in the column will be lost.
  - Added the required column `program_overview` to the `Center` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Center" DROP COLUMN "best_seller",
DROP COLUMN "program_overvew",
ADD COLUMN     "program_overview" JSONB NOT NULL,
ALTER COLUMN "modalities" DROP NOT NULL,
ALTER COLUMN "rating_count" DROP NOT NULL,
ALTER COLUMN "rating_num" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Scholarship" ALTER COLUMN "start_time" DROP NOT NULL,
ALTER COLUMN "end_time" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "min_gwa" DROP NOT NULL,
ALTER COLUMN "service_obligation" DROP NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0;
