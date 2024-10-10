import Navbar from "./user/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {RoutePath} from "../routes/RoutePath.ts";
import HomePage from "../pages/user/HomePage.tsx";
import PapersPage from "../pages/user/PapersPage.tsx";
import PaperDetails from "../pages/user/PaperDetails.tsx";
import AccessCheck from "../pages/user/AccessCheck.tsx";
import CheckoutPage from "../pages/user/CheckoutPage.tsx";
import OrdersPage from "../pages/user/OrdersPage.tsx";
import OrderDetails from "../pages/user/OrderDetails.tsx";
import LabPage from "../pages/user/LabPage.tsx";
import SuccessfulOrderWrapper from "../pages/user/SuccessfulOrderWrapper.tsx";
import {DevTools} from "jotai-devtools";
import {Toaster} from "react-hot-toast";
import React from "react";

const UserComponents = () =>{
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={RoutePath.home} element={<HomePage />} />
                <Route path={RoutePath.papers} element={<PapersPage />} />
                <Route path={`${RoutePath.papers}/:id`} element={<PaperDetails />} />
                <Route path={RoutePath.access} element={<AccessCheck/>} />
                <Route path={RoutePath.checkout} element={<CheckoutPage/>}/>
                <Route path={RoutePath.orders} element={<OrdersPage/>}/>
                <Route path={`${RoutePath.orders}/:id`} element={<OrderDetails/>}/>
                <Route path={"/lab"} element={<LabPage/>}/>
                <Route path="/success" element={<SuccessfulOrderWrapper />} />
            </Routes>
            {/*<Footer/>*/}
            <DevTools/>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}

export default UserComponents;