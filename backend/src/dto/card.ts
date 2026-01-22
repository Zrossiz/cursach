import { CashbackCategory } from "./cashBackCategory.js";

export type CardDTO = {
    id: number;
    name: string;
    cashBackCategories: CashbackCategory[];
}