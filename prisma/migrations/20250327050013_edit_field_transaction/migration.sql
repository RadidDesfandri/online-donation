/*
  Warnings:

  - Added the required column `message` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "email" TEXT,
ADD COLUMN     "externalTransactionId" TEXT,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "paymentLinkId" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentUrl" TEXT,
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
