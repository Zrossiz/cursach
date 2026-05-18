import { CategoryItem } from "../../components/CategoryItem/CategoryItem"
import type { CategoryListprops } from "./CategoryList.props"
import styles from './CategoryList.module.scss';

export const CategoryList = ({ items }: CategoryListprops) => {
    return (
        <div>
            <div className={styles.title}>Категории</div>
            <div className={styles.list}>
                {items.map(item => {
                    return <CategoryItem item={item} />
                })}
            </div>
        </div>
    )
}