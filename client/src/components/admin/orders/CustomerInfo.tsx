import {Customer} from "../../../../Api.ts";

interface CustomerProps {
    customer?: Customer;
}

const CustomerInfo = ({ customer }: CustomerProps) => {
    return (<div className="border-b mb-6 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Customer Information</h2>
        {customer ? (
            <div className="mt-2 text-gray-700">
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
            </div>
        ) : (
            <p className="text-gray-500">Loading customer information...</p>
        )}
    </div>
);
}

export default CustomerInfo;