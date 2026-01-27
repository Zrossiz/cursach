import { Link } from "react-router-dom"
import type { CategoryItemProps } from "./CategoryItem.props"

export const CategoryItem = ({ item }: CategoryItemProps) => {
    return (
        <div>
            <Link to={`/category/${item.id}`}>{item.name}</Link>
        </div>
    )
}