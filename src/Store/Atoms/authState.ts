import { atom } from "recoil";
import Cookies from "js-cookie";

export const isAuthenticatedState = atom({
    key : "isAuthenticatedState" ,
    default : !!Cookies.get("authToken")
})