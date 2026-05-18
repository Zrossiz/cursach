import { Link } from "react-router-dom"
import type { CategoryItemProps } from "./CategoryItem.props"
import styles from './CategoryItem.module.scss';

export const CategoryItem = ({ item }: CategoryItemProps) => {
    return (
        <div className={styles.wrapper}>
            <Link to={`/category/${item.id}`}>
                <div className={styles.imgWrapper}>
                    <img src={item.imgPath} alt={item.name} />
                </div>
                <div className={styles.title}>{item.name}</div>
            </Link>
        </div>
    )
}