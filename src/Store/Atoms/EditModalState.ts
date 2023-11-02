import {atom} from 'recoil'

export const EditModalState = atom({
     key : "EditModalState",
     default : {
        isOpen : false
     }
})