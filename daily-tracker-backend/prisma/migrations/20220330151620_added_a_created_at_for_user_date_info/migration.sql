-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDateInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sleepTime" REAL NOT NULL DEFAULT 0,
    "workTime" REAL NOT NULL DEFAULT 0,
    "physicalActivityTime" REAL NOT NULL DEFAULT 0,
    "brainActivityTime" REAL NOT NULL DEFAULT 0,
    "learningTime" REAL NOT NULL DEFAULT 0,
    "relaxTime" REAL NOT NULL DEFAULT 0,
    "funTime" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,
    CONSTRAINT "UserDateInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDateInfo_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDateInfo" ("brainActivityTime", "dateId", "funTime", "id", "learningTime", "physicalActivityTime", "relaxTime", "sleepTime", "userId", "workTime") SELECT "brainActivityTime", "dateId", "funTime", "id", "learningTime", "physicalActivityTime", "relaxTime", "sleepTime", "userId", "workTime" FROM "UserDateInfo";
DROP TABLE "UserDateInfo";
ALTER TABLE "new_UserDateInfo" RENAME TO "UserDateInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
