/*
  Warnings:

  - You are about to drop the column `externalTransactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "externalTransactionId",
DROP COLUMN "paymentMethod";
