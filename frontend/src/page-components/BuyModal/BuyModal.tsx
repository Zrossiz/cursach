import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BuyModal.module.scss";
import type { IBuyModalProps } from "./BuyModal.props";
import type { CardItem } from "@/types/card";
import { getUserCards } from "@/api/card";

export const BuyModal = ({ setClose }: IBuyModalProps) => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const [userCards, setUserCards] = useState<CardItem[]>([]);

  const currentCategoryId = Number(categoryId);

  const cardsWithCurCategory = useMemo(() => {
    return userCards
      .map((card) => {
        const cashbackCategory = card.cashbackCategories.find(
          (category) => category.categoryId === currentCategoryId
        );

        return {
          ...card,
          currentCashback: cashbackCategory,
        };
      })
      .filter((card) => card.currentCashback)
      .sort(
        (a, b) =>
          (b.currentCashback?.percent ?? 0) - (a.currentCashback?.percent ?? 0)
      );;
  }, [userCards, currentCategoryId]);

  const fetchUserCards = async () => {
    try {
      const res = await getUserCards();

      if (res.status !== 200) {
        console.log("res: ", res);
        return;
      }

      setUserCards(res.data);
    } catch (err) {
      console.log(err);
      setClose(true);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUserCards();
    })()
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Купить</h2>

        <div className={styles.sectionTitle}>Максимальная выгода</div>

        <div className={styles.cards}>
          {cardsWithCurCategory.map((item) => {
            console.log(cardsWithCurCategory)
            return (
                <button key={item.id} className={styles.card}>
                  <div>
                    <div className={styles.cardName}>{item.name}</div>
                  </div>
    
                  <div className={styles.cashback}>
                    Кешбэк: {item.currentCashback?.percent}%
                  </div>
                </button>
              )}
            )
          }
        </div>

        <div className={styles.dots}>•••</div>

        <button className={styles.submitButton}>Оформить</button>
      </div>
    </div>
  );
};