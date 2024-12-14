/*
  Warnings:

  - You are about to drop the column `clientId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `payeeId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_clientId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "clientId",
ADD COLUMN     "payeeId" TEXT NOT NULL,
ADD COLUMN     "payerId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'completo';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "fullname" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
