import {Route, Routes} from "react-router-dom";
import PapersPage from "./pages/PapersPage.tsx";
import PaperDetails from "./pages/PaperDetails.tsx";
import {RoutePath} from './routes/RoutePath.ts';
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import AccessCheck from "./pages/AccessCheck.tsx";
import Navbar from "./components/Navbar.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import OrderDetails from "./pages/OrderDetails.tsx";
import LabPage from "./pages/LabPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Footer from "./pages/Footer.tsx";
import React from "react";
import SuccessfulOrderWrapper from "./pages/SuccessfulOrderWrapper.tsx";

function App()  {

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

export default App;
