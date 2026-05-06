import { useParams } from "react-router-dom";
import Layout from "@/layout/Layout"
import { GoodInfo } from "@/page-components/GoodInfo/GoodInfo";
import { useEffect, useState } from "react";
import type { GoodItem } from "@/types/good";
import { getGoodById } from "@/api/good";
import axios from "axios";
import styles from './Good.module.scss';

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
            <div className={styles.wrapper}>
                {good && (
                    <GoodInfo item={good} />
                )}
            </div>
        </Layout>
    )
}

export default GoodPage;