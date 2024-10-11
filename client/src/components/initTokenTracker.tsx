import { useEffect } from "react";
import { useAtom } from "jotai";
import { TokenAtom } from "../atoms/TokenAtom.tsx";

const InitTokenTracker = () => {
    const [, setAccessToken] = useAtom(TokenAtom);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            switch (accessToken) {
                case "admin":
                    setAccessToken({ value: "admin" });
                    break;
                case "user":
                    setAccessToken({ value: "user" });
                    break;
                default:
                    setAccessToken({ value: "user" });
                    break;
            }
        }
    }, [setAccessToken]);

    return null;
};

export default InitTokenTracker;
