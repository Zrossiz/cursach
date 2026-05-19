import { CatalogItem } from "../../components/CatalogItem/CatalogItem"
import type { CatalogListProps } from "./CatalogList.props"
import styles from './CatalogList.module.scss';

export const CatalogList = ({items, categoryId}: CatalogListProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Каталог</div>
            <div className={styles.list}>
                {items.map(item => {
                    return (
                        <CatalogItem item={item} categoryId={categoryId} />
                    )
                })}
            </div>
        </div>
    )
}