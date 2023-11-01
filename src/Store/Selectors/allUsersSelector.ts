import { selector } from "recoil";
import { allUsers } from "../Atoms/allUsers";

export const allUsersSelector = selector({
    key : "allUsersSelector",
    get : ({get}) => {
        return get(allUsers);
    },
    set : ({set} , value) => {
        return set(allUsers , value);
    }
})