import {useEffect, useState} from "react";
import {Customer} from "../../../Api.ts";
import {http} from "../../http.ts";
import CustomersTable from "../../components/admin/customers/CustomersTable.tsx";

const CustomersPage = () => {

    const [customers, setCustomers] = useState<Customer[]>([]);


    const fetchCustomers = async () => {
        const res = await http.api.customerGetAllCustomers();

        if (res.data) {
            setCustomers(res.data);
        }
    }

    useEffect (() => {
        fetchCustomers();

    }, []);

    return (
        <>
            <CustomersTable customers={customers}/>
        </>
    )
}

export default CustomersPage;