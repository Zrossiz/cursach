import { CategoryItem } from "../../components/CategoryItem/CategoryItem"
import type { CategoryListprops } from "./CategoryList.props"

export const CategoryList = ({ items }: CategoryListprops) => {
    return (
        <div>
            <div>Категории</div>
            <div>
                {items.map(item => {
                    return <CategoryItem item={item} />
                })}
            </div>
        </div>
    )
}