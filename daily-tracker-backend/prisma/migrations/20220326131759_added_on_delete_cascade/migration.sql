-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDateInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sleepTime" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,
    "weightKg" INTEGER,
    CONSTRAINT "UserDateInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserDateInfo_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserDateInfo" ("dateId", "id", "sleepTime", "userId", "weightKg") SELECT "dateId", "id", "sleepTime", "userId", "weightKg" FROM "UserDateInfo";
DROP TABLE "UserDateInfo";
ALTER TABLE "new_UserDateInfo" RENAME TO "UserDateInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
