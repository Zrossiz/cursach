import { useParams } from "react-router-dom";
import Layout from "../layout/Layout"
import { GoodInfo } from "../page-components/GoodInfo/GoodInfo";
import { useEffect, useState } from "react";
import type { GoodItem } from "../types/good";
import { getGoodById } from "../api/good";
import axios from "axios";

const GoodPage = () => {
    const { goodId } = useParams()
    const [good, setGood] = useState<GoodItem>()

    const getGood = async () => {
        if (!goodId) {
            return
        }
        try {
            const res = await getGoodById(goodId)
            setGood(res.data);
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
            await getGood()
        })()
    }, [])

    return (
        <Layout>
            {good && (
                <GoodInfo item={good} />
            )}
        </Layout>
    )
}

export default GoodPage;