import { useEffect, useState } from "react"
import { getAllCategories } from "../api/categories"
import Layout from "../layout/Layout"
import { CategoryList } from "../page-components/CategoryList/CategoryList"
import type { CategoryItem } from "../types/category"

const CategoryPage = () => {
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const getCategories = async () => {
        try {
            const res = await getAllCategories()
            setCategories(res.data)
        } catch (err) {
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
            <CategoryList items={categories} />
        </Layout>
    )
}

export default CategoryPage;
