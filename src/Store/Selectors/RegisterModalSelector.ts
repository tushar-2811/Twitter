import {selector} from 'recoil';
import { RegisterModalState } from '../Atoms/RegisterModalState';

export const RegisterModalSelector = selector({
    key : "RegisterModalSelector",
    get : ({get}) => {
        return get(RegisterModalState);
    },
    set : ({set} , value) => {
       return set(RegisterModalState , value);
    }
})