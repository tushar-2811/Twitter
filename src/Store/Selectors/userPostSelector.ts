import { selector } from "recoil";
import { userPostState } from "../Atoms/userPostState";

export const userPostSelector = selector({
    key : "userPostSelector",
    get : ({get}) => {
        return get(userPostState);
    },
    set : ({set} , newValue) => {
        return set(userPostState , newValue);
    }
})