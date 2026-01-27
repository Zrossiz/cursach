import type { GoodInfoProps } from "./GoodInfo.props"

export const GoodInfo = ({ item }: GoodInfoProps) => {
    return (
        <div>
            <div>name: {item.name}</div>
            <div>img: {item.imgPath}</div>
            <div>price: {item.price}</div>
        </div>
    )
}