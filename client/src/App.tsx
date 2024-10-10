
import React, {useEffect} from "react";
import InitTokenTracker from "./components/initTokenTracker.tsx";
import {useAtom} from "jotai";
import {TokenAtom} from "./atoms/TokenAtom.tsx";
import UserComponents from "./components/UserComponents.tsx";
import AdminComponents from "./components/AdminComponents.tsx";
import {Route, Routes} from "react-router-dom";
import {RoutePath} from "./routes/RoutePath.ts";
import AccessCheck from "./pages/user/AccessCheck.tsx";

function App()  {

    const [ token ] = useAtom(TokenAtom);

  return (
      <>

        <InitTokenTracker/>
          {token.value === "user" ? <UserComponents/> : <AdminComponents/>}
          <Routes>
              <Route path={RoutePath.access} element={<AccessCheck/>} />
          </Routes>
      </>

  )
}

export default App;
