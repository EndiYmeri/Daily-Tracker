/*
  Warnings:

  - You are about to drop the column `weightKg` on the `UserDateInfo` table. All the data in the column will be lost.
  - Added the required column `brainActivityTime` to the `UserDateInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learningTime` to the `UserDateInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalActivityTime` to the `UserDateInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workTime` to the `UserDateInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Followers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Following" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDateInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sleepTime" INTEGER NOT NULL,
    "workTime" INTEGER NOT NULL,
    "physicalActivityTime" INTEGER NOT NULL,
    "brainActivityTime" INTEGER NOT NULL,
    "learningTime" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,
    CONSTRAINT "UserDateInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDateInfo_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDateInfo" ("dateId", "id", "sleepTime", "userId") SELECT "dateId", "id", "sleepTime", "userId" FROM "UserDateInfo";
DROP TABLE "UserDateInfo";
ALTER TABLE "new_UserDateInfo" RENAME TO "UserDateInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
