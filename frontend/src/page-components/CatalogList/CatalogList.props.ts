import type { GoodItem } from "../../types/good"

export type CatalogListProps = {
    items: GoodItem[]
    categoryId: string;
}