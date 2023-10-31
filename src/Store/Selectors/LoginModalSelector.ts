import {selector} from 'recoil';
import { LoginModalState } from '../Atoms/LoginModalState';

export const LoginModalSelector = selector({
    key : "LoginModalSelector",
    get : ({get}) => {
        return get(LoginModalState);
    },
    set : ({set} , value) => {
       return set(LoginModalState , value);
    }
})