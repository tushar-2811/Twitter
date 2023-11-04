import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar/Avatar";

interface postItemProps {
    userId : string;
    body ?: string;
    name : string;
    username?:string;
    like : number;
    comments : number
}

const PostItem:React.FC<postItemProps> = (
  {userId , body , name , username , like , comments}) => {
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

              <div className="
                  flex
                  flex-row
                  items-center
                  text-neutral-500
                  gap-2
                  cursor-pointer
                  transition
                  hover:text-red-500
              ">
                 <AiOutlineHeart size={20} />
                 <p> 
                  {like || 0}
                 </p>
              </div>

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default PostItem
