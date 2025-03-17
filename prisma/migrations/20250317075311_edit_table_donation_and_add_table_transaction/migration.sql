/*
  Warnings:

  - You are about to drop the column `donorName` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `content` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "donorName",
DROP COLUMN "message",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT[],
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "donorName" TEXT NOT NULL,
    "userId" UUID,
    "donationId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
