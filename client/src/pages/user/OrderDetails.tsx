import { useParams } from "react-router-dom";
import InvoiceTable from "../../components/user/InvoiceTable.tsx";
import { useEffect, useState } from "react";
import { CardItem } from "../../models/CardItem.ts";
import { http } from "../../http.ts";
import { Order, OrderEntryDto, Paper } from "../../../Api.ts";
import { formatDate } from "../../utilities/TimeUtils.tsx";

const OrderDetails = () => {
    const { id } = useParams();
    const [orderId, setOrderId] = useState<number | undefined>();
    const [order, setOrder] = useState<Order | undefined>();
    const [orderEntries, setOrderEntries] = useState<OrderEntryDto[]>([]);
    const [orderDetails, setOrderDetails] = useState<CardItem[]>([]);

    // Fetch the order ID from the URL params
    useEffect(() => {
        if (id) {
            setOrderId(Number(id)); // Convert id to a number
        }
    }, [id]);

    // Fetch the order details based on orderId
    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                try {
                    const response = await http.api.orderGetOrderById(orderId);
                    if (response.data) {
                        setOrder(response.data);
                        setOrderEntries(response.data.orderEntries || []); // Ensure orderEntries is set
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchOrder();
    }, [orderId]);

    // Fetch paper details and link them to quantities
    useEffect(() => {
        const linkPapersToQty = async () => {
            const newOrderDetails: CardItem[] = [];

            for (const orderEntry of orderEntries) {
                if (orderEntry.paperId && orderEntry.quantity) {
                    try {
                        const paperDto = await http.api.paperGetPaperById(orderEntry.paperId);
                        if (paperDto) {
                            const paperObject: Paper = {
                                id: paperDto.data.id,
                                price: paperDto.data.price,
                                name: paperDto.data.name,
                                stock: paperDto.data.stock,
                                discontinued: paperDto.data.discontinued,
                            };
                            newOrderDetails.push({ paper: paperObject, quantity: orderEntry.quantity });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }

            setOrderDetails(newOrderDetails); // Update state after processing all entries
        };

        if (orderEntries.length) {
            linkPapersToQty();
        }
    }, [orderEntries]);

    return (
        <div className="container mx-auto p-6">
            {/* Order Details Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Details</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <span className="text-gray-500">Order Date:</span>
                        <span className="text-lg font-medium text-gray-700">
                            {order?.orderDate ? formatDate(order.orderDate) : "unknown"}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Delivery Date:</span>
                        <span className="text-lg font-medium text-gray-700">
                            {order?.deliveryDate || "unknown"}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Total Amount:</span>
                        <span className="text-lg font-medium text-gray-700">
                            ${order?.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Status:</span>
                        <span
                            className={`text-lg font-medium ${
                                order?.status === "Paid" ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {order?.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Ordered Items Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Ordered Items</h2>
                <InvoiceTable items={orderDetails} />
            </div>
        </div>
    );
}

export default OrderDetails;
