/*
  Warnings:

  - You are about to alter the column `sleepTime` on the `Date` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Date" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "sleepTime" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Date_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Date" ("id", "sleepTime", "startDate", "userId") SELECT "id", "sleepTime", "startDate", "userId" FROM "Date";
DROP TABLE "Date";
ALTER TABLE "new_Date" RENAME TO "Date";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
