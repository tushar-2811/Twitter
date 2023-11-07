import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import { EditModalSelector } from "../../../Store/Selectors/EditModalSelector";
import { authSelector } from "../../../Store/Selectors/authSelector";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

interface BioProps {
    bio : string;
    name : string;
    username ?:string;
    following ?: string;
    userId ?: string;
    followersCount ?: string;
}

const UserBio:React.FC<BioProps> = ({bio , name , username , userId , following , followersCount}) => {
  let id = Cookies.get("userId");
  const setEditModal = useSetRecoilState(EditModalSelector);
  const authState = useRecoilValue(authSelector);
  const [isFollow , setIsFollow] = useState<boolean>();

  useEffect(() => {
    if(!authState) {
       setIsFollow(false);
       return;
    }

    const checkFollow = async() => {
        const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/follow/${Number(Cookies.get("userId"))}/${Number(userId)}/check`);

        if(data.isFollowing){
            setIsFollow(true);
        }else{
            setIsFollow(false);
        }
    }
    checkFollow();
  },[userId])

  const handleFollow = async() => {
      if(!authState){
         toast.success("Sign In please");
         return;
      }

      if(isFollow === false){
         const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/follow/${Number(Cookies.get("userId"))}/${Number(userId)}/add`);
         if(data.ok){
           setIsFollow(true);
         }
      }else{
        const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/follow/${Number(Cookies.get("userId"))}/${Number(userId)}/remove`);
         if(data.ok){
           setIsFollow(false);
         }
      }
      return;
  }
 
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
          {
            id === userId ? (
              <Button 
          label="Edit"
          secondary
          onClick={() => setEditModal({isOpen : true})}
          />
            ) : (
              <Button 
          label={isFollow ? "Following" : "Follow"}
          secondary
          onClick={handleFollow}
          />
            )
          }
      </div>

      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
              {name}
          </p>
          <p className="text-nd text-neutral-500">
              @{username}
          </p>

        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white">
            {bio}
          </p>

        </div>

        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">
               {following}
            </p>
            <p className="text-neutral-500" >
              Following
            </p>

          </div>

          <div className="flex flex-row items-center gap-1">
            <p className="text-white">
               {followersCount || "0"}
            </p>
            <p className="text-neutral-500" >
              Followers
            </p>

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default UserBio;
