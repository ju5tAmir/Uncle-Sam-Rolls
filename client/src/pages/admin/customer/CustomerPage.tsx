import {useEffect, useState} from "react";
import {Customer, OrderResponseDto} from "../../../../Api.ts";
import {http} from "../../../http.ts";
import {useParams} from "react-router-dom";
import OrdersTable from "../../../components/admin/orders/OrdersTable.tsx";

const CustomerPage = () => {

    const {id} = useParams();
    const [customer, setCustomer] = useState<Customer>({});
    const [orders, setOrders] = useState<OrderResponseDto[]>([])

    const fetchOrders = async (id: number) => {
        const res = await http.api.orderGetOrdersByCustomerId(id);

        if (res) {
            setOrders(res.data);
        }
    }

    const fetchCustomer = async (id: number) => {
        const res = await http.api.customerGetCustomer(id);

        if (res) {
            setCustomer(res.data);
        }
    }

    useEffect (() => {
        if (id) {
            fetchCustomer(Number(id));
        }

    }, [setCustomer]);


    useEffect (() => {
        if (id) {
            fetchOrders(Number(id));
        }

    }, [setOrders]);



    return (
        <div className="p-6">
            {/* Customer Details Section */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-sm font-medium">Name:</label>
                        <p className="text-lg font-semibold text-gray-800">{customer.name}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-sm font-medium">Address:</label>
                        <p className="text-lg font-semibold text-gray-800">{customer.address}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-sm font-medium">Phone:</label>
                        <p className="text-lg font-semibold text-gray-800">{customer.phone}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-600 text-sm font-medium">Email:</label>
                        <p className="text-lg font-semibold text-gray-800">{customer.email}</p>
                    </div>
                </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                <OrdersTable orders={orders} />
            </div>
        </div>
    );
}

export default CustomerPage;