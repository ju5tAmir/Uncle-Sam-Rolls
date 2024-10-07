import {Api} from "../Api.ts";

export const apiClient = () => {
    return new Api({
        baseURL: "http://localhost:1337"
    })
}