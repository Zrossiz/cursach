/*
  Warnings:

  - You are about to drop the column `categoryId` on the `card_cashback_categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `card_cashback_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "card_cashback_categories" DROP CONSTRAINT "card_cashback_categories_categoryId_fkey";

-- AlterTable
ALTER TABLE "card_cashback_categories" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "card_cashback_categories" ADD CONSTRAINT "card_cashback_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
