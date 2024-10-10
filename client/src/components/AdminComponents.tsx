import Navbar from "./admin/Navbar.tsx";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {RoutePath} from "../routes/RoutePath.ts";
import CustomersPage from "../pages/admin/CustomersPage.tsx";
import OrdersPage from "../pages/admin/OrdersPage.tsx";
import CustomerPage from "../pages/admin/CustomerPage.tsx";
import PropertiesPage from "../pages/admin/PropertiesPage.tsx";
import {Toaster} from "react-hot-toast";

const AdminComponents = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={RoutePath.customers} element={<CustomersPage />} />
                <Route path={`${RoutePath.customers}/:id`} element={<CustomerPage />} />
                <Route path={RoutePath.properties} element={<PropertiesPage />} />
                <Route path={RoutePath.orders} element={<OrdersPage />} />
            </Routes>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}

export default AdminComponents;