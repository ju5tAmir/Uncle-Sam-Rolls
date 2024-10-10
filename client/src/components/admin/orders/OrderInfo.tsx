import {Order, OrderEntryDetailedDto} from "../../../../Api";

interface OrderInfoProps {
    order: Order;
    orderEntries: OrderEntryDetailedDto[];
}
// Calculate the total cost

const OrderInfo = ({ order, orderEntries }: OrderInfoProps) => {

    const totalCost = orderEntries.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (<div className="border-b mb-6 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Order Information</h2>
        <div className="mt-2 text-gray-700">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Order Date:</strong> {order.orderDate}</p>
            <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
            <p><strong>Total Price:</strong> ${totalCost?.toFixed(2)}</p>
            <p><strong>Order Status:</strong> {order.status}</p>
        </div>
    </div>
    );
}

export default OrderInfo;