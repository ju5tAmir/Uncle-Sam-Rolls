import {useEffect, useState} from "react";
import {Order, OrderResponseDto} from "../../../../Api.ts";
import {http} from "../../../http.ts";
import {unmountComponentAtNode} from "react-dom";
import OrderDetail from "../components/OrderDetail.tsx";
import OrdersTable from "../../../components/user/OrdersTable.tsx";

const OrdersPage = () => {
    const [orders, setOrders] = useState<OrderResponseDto[]>([]);

    async function fetchOrders(userId: number) {
        try {
            const res = await http.api.orderGetOrdersByCustomerId(userId).then(res => res.data);

            console.log(res)
            setOrders(res);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect (() => {
        fetchOrders(1);
    }, []);

    return (
        <>
            <OrdersTable orders={orders}/>
        </>
    )
}

export default OrdersPage;