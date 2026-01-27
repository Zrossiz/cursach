import { CatalogItem } from "../../components/CatalogItem/CatalogItem"
import type { CatalogListProps } from "./CatalogList.props"

export const CatalogList = ({items, categoryId}: CatalogListProps) => {
    return (
        <div>
            <div>catalog</div>
            <div>
                {items.map(item => {
                    return (
                        <CatalogItem item={item} categoryId={categoryId} />
                    )
                })}
            </div>
        </div>
    )
}