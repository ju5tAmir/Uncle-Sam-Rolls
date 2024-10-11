import Navbar from "./admin/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {RoutePath} from "../routes/RoutePath.ts";
import CustomersPage from "../pages/admin/CustomersPage.tsx";
import OrdersPage from "../pages/admin/OrdersPage.tsx";
import CustomerPage from "../pages/admin/CustomerPage.tsx";
import PropertiesPage from "../pages/admin/PropertiesPage.tsx";
import {Toaster} from "react-hot-toast";
import OrderDetails from "../pages/admin/OrderDetails.tsx";
import PapersPage from "../pages/admin/PapersPage.tsx";
import PaperDetails from "../pages/admin/PaperDetails.tsx";
import PaperCreatePage from "../pages/admin/PaperCreatePage.tsx";
import HomePage from "./admin/HomePage.tsx";

const AdminComponents = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={RoutePath.home} element={<HomePage />} />
                <Route path={RoutePath.customers} element={<CustomersPage />} />
                <Route path={`${RoutePath.customers}/:id`} element={<CustomerPage />} />
                <Route path={RoutePath.papers} element={<PapersPage />} />
                <Route path={`${RoutePath.papers}/create`} element={<PaperCreatePage />} />
                <Route path={`${RoutePath.papers}/:id`} element={<PaperDetails />} />
                <Route path={RoutePath.properties} element={<PropertiesPage />} />
                <Route path={RoutePath.orders} element={<OrdersPage />} />
                <Route path={`${RoutePath.orders}/:id`} element={<OrderDetails />} />
            </Routes>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}

export default AdminComponents;