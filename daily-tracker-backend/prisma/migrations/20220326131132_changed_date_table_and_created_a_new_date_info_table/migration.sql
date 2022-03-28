/*
  Warnings:

  - You are about to drop the column `sleepTime` on the `Date` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Date` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Date` table. All the data in the column will be lost.
  - You are about to drop the column `weightKg` on the `Date` table. All the data in the column will be lost.
  - Added the required column `date` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "UserDateInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sleepTime" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,
    "weightKg" INTEGER,
    CONSTRAINT "UserDateInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDateInfo_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DateToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Date" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Date" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_Date" ("id") SELECT "id" FROM "Date";
DROP TABLE "Date";
ALTER TABLE "new_Date" RENAME TO "Date";
CREATE UNIQUE INDEX "Date_date_key" ON "Date"("date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_DateToUser_AB_unique" ON "_DateToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DateToUser_B_index" ON "_DateToUser"("B");
