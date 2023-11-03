import { selector } from "recoil";
import { isAuthenticatedState } from "../Atoms/authState";

export const authSelector = selector({
    key : "authSelector",
    get : ({get}) => {
        return get(isAuthenticatedState);
    },
    set : ({set} , value) => {
        return set(isAuthenticatedState , value)
    }
})