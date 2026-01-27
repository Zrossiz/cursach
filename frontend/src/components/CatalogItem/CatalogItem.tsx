import { Link } from "react-router-dom"
import type { CatalogItemProps } from "./CatalogItem.props"

export const CatalogItem = ({ item, categoryId }: CatalogItemProps) => {
    
    return (
        <div>
            <Link to={`/categories/${categoryId}/product/${item.id}`}>
                <div>item</div>
                <div>{item.name}</div>
                <div>{item.price}</div>
            </Link>
        </div>
    )
}