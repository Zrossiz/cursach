import { Link } from "react-router-dom"
import type { CatalogItemProps } from "./CatalogItem.props"
import styles from './CatalogItem.module.scss';

export const CatalogItem = ({ item, categoryId }: CatalogItemProps) => {
    
    return (
        <div className={styles.wrapper}>
            <Link className={styles.link} to={`/category/${categoryId}/good/${item.id}`}>
                <div className={styles.imgWrapper}>
                    <img 
                        width={300}
                        height={200}
                        src="https://pushishki.ru/_next/image?url=https%3A%2F%2Fimages.pushishki.ru%2Fupload%2F74abea2d-5294-4ae7-9fc0-f2215d55fab9.jpg&w=3840&q=75" 
                        alt={item.name} 
                    />
                </div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.price}>{item.price} ₽</div>
                <div className={styles.goTo}>Перейти</div>
            </Link>
        </div>
    )
}