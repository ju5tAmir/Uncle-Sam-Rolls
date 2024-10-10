
import React, {useEffect} from "react";
import SuccessfulOrderWrapper from "./pages/user/SuccessfulOrderWrapper.tsx";
import InitTokenTracker from "./components/initTokenTracker.tsx";
import {useAtom} from "jotai";
import {TokenAtom} from "./atoms/TokenAtom.tsx";
import UserComponents from "./components/UserComponents.tsx";
import AdminComponents from "./components/AdminComponents.tsx";

function App()  {

    const [ token ] = useAtom(TokenAtom);

  return (
      <>
        <InitTokenTracker/>
          {token.value === "user" ? <UserComponents/> : <AdminComponents/>}
      </>
  )
}

export default App;
