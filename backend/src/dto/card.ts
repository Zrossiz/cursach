import { CashbackCategory } from "./cashbackCategory";

export type CardDTO = {
    id: number;
    name: string;
    cashBackCategories: CashbackCategory[];
}