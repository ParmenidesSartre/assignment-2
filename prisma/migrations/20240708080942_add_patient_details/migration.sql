/*
  Warnings:

  - You are about to drop the `MedicalRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `medicalRecordId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `diagnosis` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medications` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treatmentPlan` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "address" TEXT;
ALTER TABLE "User" ADD COLUMN "allergies" TEXT;
ALTER TABLE "User" ADD COLUMN "city" TEXT;
ALTER TABLE "User" ADD COLUMN "dateOfBirth" DATETIME;
ALTER TABLE "User" ADD COLUMN "emergencyContactName" TEXT;
ALTER TABLE "User" ADD COLUMN "emergencyContactPhone" TEXT;
ALTER TABLE "User" ADD COLUMN "medicalHistory" TEXT;
ALTER TABLE "User" ADD COLUMN "phoneNumber" TEXT;
ALTER TABLE "User" ADD COLUMN "postalCode" TEXT;
ALTER TABLE "User" ADD COLUMN "state" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MedicalRecord";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "status" TEXT,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatmentPlan" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "followUp" DATETIME,
    "notes" TEXT,
    "allergies" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("createdAt", "date", "doctorId", "id", "patientId", "status", "updatedAt") SELECT "createdAt", "date", "doctorId", "id", "patientId", "status", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
