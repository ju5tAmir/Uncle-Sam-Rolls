import {Customer} from "../../../../Api.ts";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../../routes/RoutePath.ts";

interface props {
    customers: Customer[];
}

const CustomersTable = (props: props) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="overflow-x-auto p-6">
                <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        {/* Table Headers */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Address</th>
                            <th className="py-3 px-6 text-left">Phone</th>
                            <th className="py-3 px-6 text-left">Email</th>
                        </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="text-gray-700 text-sm font-light">
                        {props.customers.map((customer, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                                onClick={() => {
                                    navigate(`${RoutePath.customers}/${customer.id}`);
                                }}>
                                <td className="py-3 px-6">{customer.id}</td>
                                <td className="py-3 px-6">{customer.name}
                                </td>
                                <td className="py-3 px-6">{customer.address}</td>
                                <td className="py-3 px-6">{customer.phone}</td>
                                <td className={`py-3 px-6`}>{customer.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CustomersTable;
