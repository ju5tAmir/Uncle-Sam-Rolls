import {http} from "../../http.ts";
import {useEffect, useState} from "react";
import {OrderResponseDto} from "../../../Api.ts";
import OrdersTable from "../../components/admin/orders/OrdersTable.tsx";

const OrdersPage = () => {

    const [orders, setOrders] = useState<OrderResponseDto[]>([]);

    const fetchOrders = async () => {
        const res = await http.api.orderGetHistoryForUsers();

        if (res) {
            setOrders(res.data);
        }
    }

    useEffect (() => {
        fetchOrders();
    }, [setOrders]);

    return (
        <>
            <OrdersTable orders={orders}/>
        </>
    )
}


export default OrdersPage;