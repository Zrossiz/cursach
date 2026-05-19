import { useParams } from "react-router-dom";
import Layout from "@/layout/Layout"
import { useEffect, useState } from "react";
import type { GoodItem } from "@/types/good";
import { getGoodById } from "@/api/good";
import axios from "axios";
import styles from './Good.module.scss';
import { BuyModal } from "@/page-components/BuyModal/BuyModal";

const GoodPage = () => {
    const { goodId } = useParams()
    const [good, setGood] = useState<GoodItem>()
    const [buy, setBuy] = useState<boolean>(false);

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
            {buy && (
                <BuyModal 
                    setClose={setBuy} 
                />
            )}
            <h1 className={styles.title}>{good?.name}</h1>

            <div className={styles.content}>
                <section className={styles.left}>
                <div className={styles.slider}>
                    <button className={styles.arrow}>{"<"}</button>

                    <div className={styles.imageBox}>
                    {/* <img src="/product.png" alt="Название товара" /> */}
                    </div>

                    <button className={styles.arrow}>{">"}</button>
                </div>

                <div className={styles.specs}>
                    <h2>Характеристики</h2>
                </div>
                </section>

                <aside className={styles.info}>
                <p className={styles.subtitle}>Описание</p>

                <h2 className={styles.productName}>Название товара</h2>

                <div className={styles.meta}>
                    <span>Рейтинг</span>
                    <span>Наличие</span>
                </div>

                <div className={styles.divider} />

                <div className={styles.props}>
                    <p><b>Артикул:</b> YZF-R6 9566</p>
                    <p><b>Бренд:</b> ToyLand</p>
                    <p><b>Производитель:</b> RiverToys</p>
                    <p><b>Аккумулятор:</b> 12v/10ah</p>
                    <p><b>Максимальная нагрузка:</b> 30 кг</p>
                    <p><b>Цена:</b> {good?.price}</p>
                </div>

                <div className={styles.colors}>
                    <span>Цвет:</span>
                    <button />
                    <button />
                    <button />
                    <button />
                </div>

                <button className={styles.buyButton} onClick={() => setBuy(true)}>Купить</button>
                </aside>
            </div>
        </Layout>
    )
}

export default GoodPage;