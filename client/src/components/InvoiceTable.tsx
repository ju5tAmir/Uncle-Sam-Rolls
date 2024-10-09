import { CardItem } from "../models/CardItem.ts";

interface props {
    items: CardItem[];
}

const InvoiceTable = (props: props) => {
    // Calculate the total cost
    const totalCost = props.items.reduce((acc, item) => {
        return acc + item.paper.price * item.quantity;
    }, 0);

    return (
        <>
            <div className="overflow-x-auto p-6">
                <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        {/* Table Headers */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Paper</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Qty</th>
                            <th className="py-3 px-6 text-left">Cost</th>
                        </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="text-gray-700 text-sm font-light">
                        {props.items.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">{item.paper.name}</td>
                                <td className="py-3 px-6">${item.paper.price.toFixed(2)}</td>
                                <td className="py-3 px-6">{item.quantity}</td>
                                <td className="py-3 px-6">
                                    ${(item.paper.price * item.quantity).toFixed(2)}
                                </td>
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
};

export default InvoiceTable;
