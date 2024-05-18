/*
  Warnings:

  - Made the column `customerId` on table `customer_profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "customer_profile" DROP CONSTRAINT "customer_profile_customerId_fkey";

-- AlterTable
ALTER TABLE "customer_profile" ALTER COLUMN "customerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "customer_profile" ADD CONSTRAINT "customer_profile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
