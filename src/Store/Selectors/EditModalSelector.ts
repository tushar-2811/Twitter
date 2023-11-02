import {selector} from 'recoil';
import { EditModalState } from '../Atoms/EditModalState';

export const EditModalSelector = selector({
    key : "EditModalSelector",
    get : ({get}) => {
        return get(EditModalState);
    },
    set : ({set} , value) => {
       return set(EditModalState , value);
    }
})