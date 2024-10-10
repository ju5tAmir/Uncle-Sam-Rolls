import {OrderEntryDetailedDto, OrderResponseDto} from "../../../../Api.ts";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../../utilities/TimeUtils.tsx";
interface props {
    ordersEntries: OrderEntryDetailedDto[];
}
const OrderEntriesTable = ({ordersEntries} : props) => {
    const navigate = useNavigate();

    // Calculate the total cost
    const totalCost = ordersEntries.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);


    return (
        <>
            <div className="overflow-x-auto p-6">
                <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        {/* Table Headers */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Paper Name</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Quantity</th>
                            <th className="py-3 px-6 text-left">Cost</th>
                        </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="text-gray-700 text-sm font-light">
                        {ordersEntries.map((entry, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                                onClick={() => {
                                    // navigate(`${RoutePath.orders}/${order.id}`);
                                }}
                            >
                                <td className="py-3 px-6">{entry.id}</td>
                                <td className="py-3 px-6">
                                    {entry.name}
                                </td>
                                <td className="py-3 px-6">${entry.price}</td>
                                <td className="py-3 px-6">{entry.quantity}</td>
                                <td className="py-3 px-6">${entry.price * entry.quantity}</td>
                            </tr>
                        ))}
                        {/* Final row for total cost */}
                        <tr className="font-bold text-gray-900 bg-gray-50">
                            <td colSpan={4} className="py-3 px-6 text-right">
                                Total Cost:
                            </td>
                            <td className="py-3 px-6">${totalCost.toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default OrderEntriesTable;