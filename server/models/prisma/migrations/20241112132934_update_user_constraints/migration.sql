/*
  Warnings:

  - A unique constraint covering the columns `[email,loginMethod]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_loginMethod_key" ON "User"("email", "loginMethod");
