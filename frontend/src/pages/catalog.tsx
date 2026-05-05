import Layout from "../layout/Layout"
import { getAllGoodsByCategory } from "../api/good"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { GoodItem } from "../types/good"
import { CatalogList } from "../page-components/CatalogList/CatalogList"
import axios from "axios"

const CatalopPage = () => {
    const [goods, setGoods] = useState<GoodItem[]>([])
    const { categoryId } = useParams()

    const getGoods = async () => {
        try {
            if (!categoryId) {
                return 
            }
            const res = await getAllGoodsByCategory(categoryId)
            if (res.status === 401) {
                window.location.replace("/login")
            }
            setGoods(res.data)
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
            await getGoods()
        })()
    }, [])

    return (
        <Layout>
            {goods && <CatalogList categoryId={categoryId ?? ""} items={goods} />}
        </Layout>
    )
}

export default CatalopPage