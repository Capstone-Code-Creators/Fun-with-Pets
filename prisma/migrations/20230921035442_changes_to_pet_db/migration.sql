/*
  Warnings:

  - You are about to drop the column `image` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "image",
DROP COLUMN "type",
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "photo" VARCHAR(255) NOT NULL;
