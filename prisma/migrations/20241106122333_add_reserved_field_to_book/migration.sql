/*
  Warnings:

  - Added the required column `pages` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "pages" INTEGER NOT NULL,
ADD COLUMN     "reserved" INTEGER[];
