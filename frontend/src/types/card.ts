import type { CashbackCategory } from "./cashback";

export type CardItem = {
    id: number;
    name: string;
    cashBackCategories: CashbackCategory[];
}