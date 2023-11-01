import {atom} from 'recoil'

export const allUsers = atom({
    key : "allUsers",
    default : {
        users : []
    }
})