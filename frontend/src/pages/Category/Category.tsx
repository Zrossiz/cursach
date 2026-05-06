import { useEffect, useState } from "react"
import { getAllCategories } from "@/api/category"
import Layout from "@/layout/Layout"
import { CategoryList } from "@/page-components/CategoryList/CategoryList"
import type { CategoryItem } from "@/types/category"
import axios from "axios"
import styles from './Category.module.scss';

const CategoryPage = () => {
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const getCategories = async () => {
        try {
            const res = await getAllCategories()
            setCategories(res.data)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    window.location.replace("/login");
                    return;
                }

                console.log(err.response?.data);
                return;
            }
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            await getCategories()
        })()
    }, [])

    return (
        <Layout>
            <div className={styles.wrapper}>
                <CategoryList items={categories} />
            </div>
        </Layout>
    )
}

export default CategoryPage;
