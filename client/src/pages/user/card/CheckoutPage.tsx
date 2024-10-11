import {useAtom} from "jotai/index";
import {CardItemsAtom} from "../../../atoms/CardItemsAtom.tsx";
import CheckoutItem from "../../../components/user/CheckoutItem.tsx";
import React, {useEffect} from "react";
import InvoiceTable from "../../../components/user/InvoiceTable.tsx";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../../routes/RoutePath.ts";
import {http} from "../../../http.ts";
import toast, {Toaster} from "react-hot-toast";

const CheckoutPage = () => {

    const [cardItems, setCardItems] = useAtom(CardItemsAtom);

    const navigate = useNavigate();

    useEffect (() => {

    }, [setCardItems]);

    if (!cardItems || cardItems.length === 0) {
        return (
            <div className="flex justify-center place-items-center mt-60 text-5xl font-bold">
                Your cart is empty!
            </div>
        );
    }

    async function handleCheckout() {
        try {
            const orderEntries = cardItems.map(item => ({
                paperId: item.paper.id,
                quantity: item.quantity
            }));

            const response = await http.api.orderCreateOrder({
                customerId: 1,
                orderEntries: orderEntries,
            });

            if (response.data) {
                toast.success("You order has been placed successfully.")
                toast.success("Redirecting ...")
                const timer = setTimeout(() => {
                    navigate('/success', { state: { orderResponse: response.data } });
                }, 1500);

                return () => clearTimeout(timer);

            } else {
                toast.error("An error occurred while processing your order");
                console.log("error");
            }
        } catch (error) {
            toast.error("An error occurred while processing your order");
            console.error("Error during order creation:", error);
        }
    }

    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className="grid grid-cols-2 relative">
                <div className="flex flex-col place-items-center gap-10">
                    {cardItems.map((item) => (
                        <CheckoutItem key={item.paper.id} item={item} size={item.quantity} />
                    ))}
                </div>
                <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-10 mr-36">
                    <InvoiceTable items={cardItems} />
                    <div className="flex flex-col mt-4 space-y-2">
                        <button
                            onClick={() => navigate(RoutePath.papers)}
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-300 ease-in-out">
                            Continue Shopping
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-700 transition duration-300 ease-in-out">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CheckoutPage;