-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'VOLUNTEER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
