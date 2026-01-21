/*
  Warnings:

  - A unique constraint covering the columns `[card_id,category_id]` on the table `card_cashback_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `goods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goods" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "card_cashback_categories_card_id_category_id_key" ON "card_cashback_categories"("card_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "goods" ADD CONSTRAINT "goods_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_cashback_categories" ADD CONSTRAINT "card_cashback_categories_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_cashback_categories" ADD CONSTRAINT "card_cashback_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "cashback_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
