import React from "react";
import {useLocation} from "react-router-dom";
import SuccessfulOrder from "./SuccessfulOrder.tsx";

const SuccessfulOrderWrapper = () => {
    const location = useLocation();
    const { orderResponse } = location.state || {}; // Access orderResponse from location state

    if (!orderResponse) {
        return <div>No order details available.</div>; // Handle case where no orderResponse is provided
    }

    return <SuccessfulOrder orderResponse={orderResponse} />;
};

export default SuccessfulOrderWrapper;