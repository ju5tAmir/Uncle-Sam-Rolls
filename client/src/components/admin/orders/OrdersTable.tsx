import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utilities/TimeUtils.tsx";
import {RoutePath} from "../../../routes/RoutePath.ts";
import {OrderResponseDto} from "../../../../Api.ts";

interface props {
    orders: OrderResponseDto[];
}

const OrdersTable = (props: props) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="overflow-x-auto p-6">
                <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        {/* Table Headers */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Order Date</th>
                            <th className="py-3 px-6 text-left">Delivery Date</th>
                            <th className="py-3 px-6 text-left">Total Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="text-gray-700 text-sm font-light">
                        {props.orders.map((order, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                                onClick={() => {
                                    navigate(`${RoutePath.orders}/${order.id}`);
                                }}
                            >
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">
                                    {order.orderDate ? formatDate(order.orderDate) : "N/A"}
                                </td>
                                <td className="py-3 px-6">{order.deliveryDate || "N/A"}</td>
                                <td className="py-3 px-6">${order.totalAmount.toFixed(2)}</td>
                                <td className={`py-3 px-6 ${order.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                                    {order.status}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default OrdersTable;
