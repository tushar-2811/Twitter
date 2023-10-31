import {atom} from 'recoil'

export const RegisterModalState = atom({
    key : "RegisterModalState",
    default : {
        isOpen : false
    }
})