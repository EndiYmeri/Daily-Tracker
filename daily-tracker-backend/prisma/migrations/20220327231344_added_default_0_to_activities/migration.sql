-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDateInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sleepTime" INTEGER NOT NULL DEFAULT 0,
    "workTime" INTEGER NOT NULL DEFAULT 0,
    "physicalActivityTime" INTEGER NOT NULL DEFAULT 0,
    "brainActivityTime" INTEGER NOT NULL DEFAULT 0,
    "learningTime" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,
    CONSTRAINT "UserDateInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDateInfo_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDateInfo" ("brainActivityTime", "dateId", "id", "learningTime", "physicalActivityTime", "sleepTime", "userId", "workTime") SELECT "brainActivityTime", "dateId", "id", "learningTime", "physicalActivityTime", "sleepTime", "userId", "workTime" FROM "UserDateInfo";
DROP TABLE "UserDateInfo";
ALTER TABLE "new_UserDateInfo" RENAME TO "UserDateInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
