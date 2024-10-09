import {Api} from "../Api.ts";

const baseUrl = "http://localhost:1337"

export const http = new Api({
    baseURL: baseUrl
});