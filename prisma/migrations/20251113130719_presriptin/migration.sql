/*
  Warnings:

  - Added the required column `instructions` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `prescriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prescriptions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
