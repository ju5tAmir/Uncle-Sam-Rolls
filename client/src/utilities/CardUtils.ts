import {useAtom} from "jotai";
import {CardItemsAtom} from "../atoms/CardItemsAtom.tsx";
import {CardItem} from "../models/CardItem.ts";
import {setItemToLocalStorage} from "./LocalStorageUtils.ts";


const useCardUtils = () => {

    // Maybe move card init from localstorage to here ?

    const [cardItems, setCardItems] = useAtom(CardItemsAtom);


    const addItemToCard = (cardItem: CardItem) => {

        // Check if the cardItem already exists in cardItems array
        const itemExists = cardItems.some(item => item.paper.id === cardItem.paper.id);

        if (itemExists) {
            // Update the existing item
            const updatedCardItems = cardItems.map(item =>
                item.paper.id === cardItem.paper.id ? cardItem : item // Replace the old item with the new one
            );

            // Update state with the modified cardItems array
            setCardItems(updatedCardItems);

            // Update localStorage with the modified cardItems array
            setItemToLocalStorage<CardItem[]>("card_items", updatedCardItems);
        } else {
            // If item doesn't exist, add it to the list
            const updatedCardItems = [...cardItems, cardItem];

            // Update state with the new cardItems array
            setCardItems(updatedCardItems);

            // Update localStorage with the new cardItems array
            setItemToLocalStorage<CardItem[]>("card_items", updatedCardItems);
        }
    };

    const removeItemFromCard = (cardItem: CardItem) => {
        const itemExists = cardItems.some(item => item.paper.id === cardItem.paper.id);

        if (itemExists) {
            const updatedItems = cardItems.filter((item) =>
                item.paper.id !== cardItem.paper.id)

            console.log (itemExists)
            setCardItems(updatedItems);

            setItemToLocalStorage<CardItem[]>("card_items", updatedItems);
        }
    }

    return {
        cardItems,
        addItemToCard,
        removeItemFromCard
    };
}

export default useCardUtils;