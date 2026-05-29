/*
  Warnings:

  - You are about to drop the column `stars` on the `Center` table. All the data in the column will be lost.
  - Made the column `rating_count` on table `Center` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating_num` on table `Center` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Center" DROP COLUMN "stars",
ALTER COLUMN "rating_count" SET NOT NULL,
ALTER COLUMN "rating_count" SET DEFAULT 0,
ALTER COLUMN "rating_num" SET NOT NULL,
ALTER COLUMN "rating_num" SET DEFAULT 0.0;
