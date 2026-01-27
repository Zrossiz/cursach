import { useEffect, useState } from "react"
import type { UserCardsProps } from "./UserCards.props"
import { getUserCards } from "../../api/card"
import type { CardItem } from "../../types/card"

export const UserCards = ({ categoryId }: UserCardsProps) => {
    const [cards, setCards] = useState<CardItem[]>()
    const [preferredCards, setPrefferdCards] = useState<CardItem[]>()

    const getCards = async () => {
        try {
            const res = await getUserCards()
            setCards(res.data);
            getPreferredCards(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getPreferredCards = (cards: CardItem[]) => {
        const cardsWithPrefferedCashbacks: CardItem[] = []
        cards.forEach(card => {
            card.cashBackCategories.forEach(cashbackItem => {
                if (cashbackItem.categoryId === categoryId) {
                    cardsWithPrefferedCashbacks.push(card)
                }
            })
        })
        setPrefferdCards(cardsWithPrefferedCashbacks)
    }

    useEffect(() => {
        (async () => {
            await getCards()
        })()
    }, [])

    return (
        <div>
            <div>cards: {cards && cards?.map(item => {
                return (
                    <div>{item.name}</div>
                )
            })}</div>
            <div>preffered cards: {preferredCards && preferredCards?.map(item => {
                return (
                    <div>{item.name}</div>
                )
            })}</div>
        </div>
    )
}