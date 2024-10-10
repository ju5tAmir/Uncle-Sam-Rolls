import React from "react";
import OrderEntriesTable from "./OrderEntriesTable.tsx";
import {OrderEntryDetailedDto} from "../../../../Api.ts";

interface OrderEntriesProps {
    orderEntries: OrderEntryDetailedDto[];
}

const OrderEntries = ({ orderEntries }: OrderEntriesProps) => {

    return (
    <div>
        <h2 className="text-2xl font-semibold text-gray-800">Order Entries</h2>
        {orderEntries.length > 0 ? (
            <OrderEntriesTable ordersEntries={orderEntries} />
        ) : (
            <p className="text-gray-500">No order entries available.</p>
        )}
    </div>
);
}

export default OrderEntries;