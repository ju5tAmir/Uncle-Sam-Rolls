import {useAtom} from "jotai/index";
import {CardItemsAtom} from "../atoms/CardItemsAtom.tsx";
import CheckoutItem from "../components/CheckoutItem.tsx";
import {useEffect} from "react";

const CheckoutPage = () => {

    const [cardItems, setCardItems] = useAtom(CardItemsAtom);


    useEffect (() => {

    }, [setCardItems]);

    if (!cardItems || cardItems.length == 0) {
        return <div className="flex justify-center place-items-center mt-60 text-5xl font-bold">Your cart is empty!</div>
    }

    return (
        <div className="flex flex-col place-items-center gap-10">
            {cardItems.map((i) => (
                <CheckoutItem item={i} size={i.quantity}/>
            ))}

        </div>
    )
}

export default CheckoutPage;