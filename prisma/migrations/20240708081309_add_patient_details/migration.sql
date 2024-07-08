/*
  Warnings:

  - You are about to drop the column `status` on the `Appointment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "diagnosis" TEXT,
    "treatmentPlan" TEXT,
    "medications" TEXT,
    "followUp" DATETIME,
    "notes" TEXT,
    "allergies" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("allergies", "createdAt", "date", "diagnosis", "doctorId", "followUp", "id", "medications", "notes", "patientId", "treatmentPlan", "updatedAt") SELECT "allergies", "createdAt", "date", "diagnosis", "doctorId", "followUp", "id", "medications", "notes", "patientId", "treatmentPlan", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
