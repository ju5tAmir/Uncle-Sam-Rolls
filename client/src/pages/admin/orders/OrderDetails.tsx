import { useParams } from "react-router-dom";
import { Customer, Order, OrderEntryDetailedDto } from "../../../../Api.ts";
import { useEffect, useState } from "react";
import { http } from "../../../http.ts";
import NotFound from "../../user/general/NotFound.tsx";
import CustomerInfo from "../../../components/admin/orders/CustomerInfo.tsx";
import OrderInfo from "../../../components/admin/orders/OrderInfo.tsx";
import OrderEntries from "../../../components/admin/orders/OrderEntries.tsx";

const OrderDetails = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState<Customer>();
    const [order, setOrder] = useState<Order | null>(null);
    const [orderEntries, setOrderEntries] = useState<OrderEntryDetailedDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    // Fetch Order details
    const fetchOrder = async (orderId: number) => {
        setLoading(true); // Start loading
        try {
            const res = await http.api.orderGetOrderById(orderId);
            if (res.status === 200) {
                setOrder(res.data);
            } else {
                setOrder(null); // Explicitly set to null on error
            }
        } finally {
            setLoading(false); // End loading regardless of success or failure
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrder(Number(id));
        }
    }, [id]);

    // Fetch Customer
    const fetchCustomer = async (customerId: number) => {
        const res = await http.api.customerGetCustomer(customerId);
        if (res.data) {
            setCustomer(res.data);
        }
    };

    useEffect(() => {
        if (order?.customerId && order.id) {
            fetchCustomer(order.customerId);
            fetchOrderEntries(order.id);
        }
    }, [order]);

    // Fetch OrderEntries, Qty
    const fetchOrderEntries = async (orderId: number) => {
        const res = await http.api.orderGetOrderDetails(orderId);
        if (res.data) {
            setOrderEntries(res.data);
        }
    };

    if (loading) {
        // Show a loading indicator or placeholder
        return <div className="text-center">Loading...</div>;
    }

    if (!order) {
        // Show NotFound if no order is found after loading
        return <NotFound />;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Order Details</h1>

            {/* Customer details */}
            <CustomerInfo customer={customer} />

            {/* Order info */}
            <OrderInfo order={order} orderEntries={orderEntries} />

            {/* Order Entries as table */}
            <OrderEntries orderEntries={orderEntries} />
        </div>
    );
};

export default OrderDetails;
