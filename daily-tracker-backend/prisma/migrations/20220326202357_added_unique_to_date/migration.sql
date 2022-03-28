/*
  Warnings:

  - You are about to drop the `_DateToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_DateToUser_B_index";

-- DropIndex
DROP INDEX "_DateToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DateToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDateInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sleepTime" INTEGER NOT NULL,
    "weightKg" INTEGER,
    "userId" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,
    CONSTRAINT "UserDateInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDateInfo_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDateInfo" ("dateId", "id", "sleepTime", "userId", "weightKg") SELECT "dateId", "id", "sleepTime", "userId", "weightKg" FROM "UserDateInfo";
DROP TABLE "UserDateInfo";
ALTER TABLE "new_UserDateInfo" RENAME TO "UserDateInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
