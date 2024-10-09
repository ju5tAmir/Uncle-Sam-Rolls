import React, {useEffect} from 'react';
import { OrderResponseDto } from "../../Api.ts";
import {useAtom} from "jotai";
import {CardItemsAtom} from "../atoms/CardItemsAtom.tsx";

interface Props {
    orderResponse: OrderResponseDto;
}

const SuccessfulOrder = ({ orderResponse }: Props) => {
    const [, setCardItems] = useAtom(CardItemsAtom)

    function clearCartItems() {
        // Remove the cart items from localStorage
        localStorage.removeItem("card_items"); // Correct way to remove an item from localStorage

        // Clear the state in your application
        setCardItems([]); // This sets the cardItems atom to an empty array
    }

    useEffect (() => {
        clearCartItems();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 py-8">
            <h1 className="text-5xl font-bold text-green-600 mb-4">Order Confirmation</h1>
            <p className="text-lg text-gray-700 mb-6">Thank you for your order!</p>

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
                <h2 className="text-3xl font-semibold mb-4">Order Details</h2>
                <p className="mb-2"><strong>Order ID:</strong> {orderResponse.id}</p>
                <p className="mb-2"><strong>Order Date:</strong> {new Date(orderResponse.orderDate).toLocaleDateString()}</p>
                <p className="mb-2"><strong>Possible Delivery Date:</strong> {orderResponse.deliveryDate}</p>

                <h3 className="text-2xl font-semibold mt-6 mb-2">Ordered Items:</h3>

                <div className="flex justify-between font-semibold border-t pt-4">
                    <span>Total:</span>
                    <span>${orderResponse.totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={() => window.location.href = '/'} // Redirect to home or another page
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded transition duration-200 hover:bg-blue-700"
            >
                Continue Shopping
            </button>
        </div>
    );
}

export default SuccessfulOrder;
