/*
  Warnings:

  - Added the required column `icon_name` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "icon_name" TEXT NOT NULL;
