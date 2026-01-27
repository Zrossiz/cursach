import { useState } from "react"
import type { GoodInfoProps } from "./GoodInfo.props"
import { UserCards } from "../../components/UserCards/UserCards";

export const GoodInfo = ({ item }: GoodInfoProps) => {
    const [buy, setBuy] = useState(false);
    return (
        <div>
            <div>name: {item.name}</div>
            <div>img: {item.imgPath}</div>
            <div>price: {item.price}</div>
            <div onClick={() => setBuy(!buy)}>Купить</div>
            {buy && <UserCards categoryId={item.categoryId} />}
        </div>
    )
}