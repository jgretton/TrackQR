/*
  Warnings:

  - You are about to drop the column `user_id` on the `scans` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "qr_codes" DROP CONSTRAINT "qr_codes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "scans" DROP CONSTRAINT "scans_user_id_fkey";

-- AlterTable
ALTER TABLE "qr_codes" ADD COLUMN     "scan_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "scans" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "users";
