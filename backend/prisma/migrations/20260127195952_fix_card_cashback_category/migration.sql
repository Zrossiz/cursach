/*
  Warnings:

  - You are about to drop the column `category_id` on the `card_cashback_categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_id,cashback_category_id]` on the table `card_cashback_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cashback_category_id` to the `card_cashback_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "card_cashback_categories" DROP CONSTRAINT "card_cashback_categories_card_id_fkey";

-- DropForeignKey
ALTER TABLE "card_cashback_categories" DROP CONSTRAINT "card_cashback_categories_category_id_fkey";

-- DropIndex
DROP INDEX "card_cashback_categories_card_id_category_id_key";

-- AlterTable
ALTER TABLE "card_cashback_categories" DROP COLUMN "category_id",
ADD COLUMN     "cashback_category_id" INTEGER NOT NULL,
ADD COLUMN     "categoryId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "card_cashback_categories_card_id_cashback_category_id_key" ON "card_cashback_categories"("card_id", "cashback_category_id");

-- AddForeignKey
ALTER TABLE "card_cashback_categories" ADD CONSTRAINT "card_cashback_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_cashback_categories" ADD CONSTRAINT "card_cashback_categories_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_cashback_categories" ADD CONSTRAINT "card_cashback_categories_cashback_category_id_fkey" FOREIGN KEY ("cashback_category_id") REFERENCES "cashback_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
