import {selector} from 'recoil'
import { PostListState } from '../Atoms/PostListState'

export const PostSelector = selector({
    key : "PostSelector" , 
    get : ({get}) => {
        return get(PostListState);
    },
    set : ({set} , newValue) => {
        return set(PostListState,newValue)
    }
})