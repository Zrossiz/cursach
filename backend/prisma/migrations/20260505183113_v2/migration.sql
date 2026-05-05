/*
  Warnings:

  - You are about to drop the column `category_id` on the `goods` table. All the data in the column will be lost.
  - You are about to drop the `card_cashback_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cashback_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_category_id` to the `goods` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "card_cashback_categories" DROP CONSTRAINT "card_cashback_categories_card_id_fkey";

-- DropForeignKey
ALTER TABLE "card_cashback_categories" DROP CONSTRAINT "card_cashback_categories_cashback_category_id_fkey";

-- DropForeignKey
ALTER TABLE "card_cashback_categories" DROP CONSTRAINT "card_cashback_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "goods" DROP CONSTRAINT "goods_category_id_fkey";

-- AlterTable
ALTER TABLE "goods" DROP COLUMN "category_id",
ADD COLUMN     "product_category_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "card_cashback_categories";

-- DropTable
DROP TABLE "cashback_categories";

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "product_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_cashback_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "bank_cashback_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_cashback_rules" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "bank_cashback_category_id" INTEGER NOT NULL,
    "product_category_id" INTEGER NOT NULL,
    "percent" INTEGER NOT NULL,

    CONSTRAINT "card_cashback_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_slug_key" ON "product_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "card_cashback_rules_card_id_bank_cashback_category_id_produ_key" ON "card_cashback_rules"("card_id", "bank_cashback_category_id", "product_category_id");

-- AddForeignKey
ALTER TABLE "goods" ADD CONSTRAINT "goods_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_cashback_rules" ADD CONSTRAINT "card_cashback_rules_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_cashback_rules" ADD CONSTRAINT "card_cashback_rules_bank_cashback_category_id_fkey" FOREIGN KEY ("bank_cashback_category_id") REFERENCES "bank_cashback_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_cashback_rules" ADD CONSTRAINT "card_cashback_rules_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
