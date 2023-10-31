import {atom} from 'recoil'

export const LoginModalState = atom({
     key : "LoginModalState",
     default : {
        isOpen : false
     }
})