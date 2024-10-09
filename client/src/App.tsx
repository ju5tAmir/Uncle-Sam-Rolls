import {Route, Routes} from "react-router-dom";
import PapersPage from "./pages/PapersPage.tsx";
import PaperDetails from "./pages/PaperDetails.tsx";
import {RoutePath} from './routes/RoutePath.ts';
import Lab from "./pages/Lab.tsx";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import AccessCheck from "./pages/AccessCheck.tsx";
import Navbar from "./components/Navbar.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";

function App()  {

  return (
      <>

        <Navbar/>
            <Routes>
                <Route path={RoutePath.papers} element={<PapersPage />} />
                <Route path={`${RoutePath.papers}/:id`} element={<PaperDetails />} />
                <Route path={"/Lab"} element={<Lab/>} />
                <Route path={RoutePath.access} element={<AccessCheck/>} />
                <Route path={RoutePath.checkout} element={<CheckoutPage/>}/>
            </Routes>
            <DevTools/>
          <Toaster
              position="bottom-right"
              reverseOrder={false}
          />
      </>
  )
}

export default App
