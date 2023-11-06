import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar/Avatar";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginModalSelector } from "../../../Store/Selectors/LoginModalSelector";
import axios from "axios";
import { authSelector } from "../../../Store/Selectors/authSelector";

interface postItemProps {
    userId : string;
    body ?: string;
    name : string;
    username?:string;
    like : number;
    comments : number;
    postId : number;
}

const PostItem:React.FC<postItemProps> = (
  {userId , body , name , username , like , comments , postId}) => {


    const setLoginModal = useSetRecoilState(LoginModalSelector);
    const authState = useRecoilValue(authSelector);
    const [totalLiked , setTotalLiked] = useState(like);
    const [isLiked , setIsLiked] = useState<boolean>();

    useEffect(() => {
      if(!authState){
        setIsLiked(false);
         return;
      }

      const checkIsLiked = async() => {
            const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/user/${Number(Cookies.get("userId"))}/${Number(postId)}/check`);
            if(data.isLiked) {
               setIsLiked(true);
            }else{
              setIsLiked(false);
            }
      }

      checkIsLiked();
    } ,[authState])

    const handleLike = async() => {
         try {
          if(!authState){
             setLoginModal({isOpen : true});
             return;
          }

          // setIsLiked(!isLiked);

          // if(isLiked){
          //    await axios.post(`http://127.0.0.1:8000/api/v1/user/${Number(Cookies.get("userId"))}/${Number(postId)}/1`);
          //    setTotalLiked(totalLiked + 1);
          
          // }

          // else{
          //   await axios.post(`http://127.0.0.1:8000/api/v1/user/${Number(Cookies.get("userId"))}/${Number(postId)}/0`);
          //   setTotalLiked(totalLiked-1);
           
          // }


         } catch (error) {
           console.log(error);
           toast.error("something went wrong");
         }
    }
  return (
    <div
    className="
      border-b-[1px]
      border-neutral-800
      p-5
      cursor-pointer
      hover:bg-neutral-900
      transition
     ">

      <div className="flex flex-row items-start gap-3">
        <Avatar userId={userId} name={name}/> 
        <div>
          <div className="
           flex flex-row items-center gap-2
          ">

            <p className="text-white font-semibold cursor-pointer hover:underline">
                  {name} 
            </p>

            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{username}
            </span>

          </div>

          <div className="text-white mt-1">
            {body}
          </div>

          <div className="flex flex-row items-center mt-3 gap-10">
              <div className="
                  flex
                  flex-row
                  items-center
                  text-neutral-500
                  gap-2
                  cursor-pointer
                  transition
                  hover:text-sky-500
              ">
                 <AiOutlineMessage size={20} />
                 <p> 
                  {comments || 0}
                 </p>
              </div>

              <div
              onClick={handleLike} 
              className = {`
              flex
              flex-row
              items-center
              text-neutral-500
              gap-2
              cursor-pointer
              transition
              hover:text-red-500
              ${isLiked ? "text-red-500" : ""}
              `} >
                 <AiOutlineHeart size={20} />
                 <p> 
                  {totalLiked || 0}
                 </p>
              </div>

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default PostItem
