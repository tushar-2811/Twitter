import { atom } from "recoil";

interface Post {
    id : number;
    body?: string;
    userId: number;
    likedIds: [],
    user: {
        id: number;
        name: string;
        username: string;
        bio?: string;
        email: string;
        image?: string;
        coverImage?: string;
        profileImage?: string;
        hashedPassword: string;
        followingIds: [],
        hasNotification?: boolean
    },
    comments: []
}

export const userPostState = atom<Post[]>({
    key : "userPostState",
    default : []
})