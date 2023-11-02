import { useSetRecoilState } from "recoil";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import { EditModalSelector } from "../../../Store/Selectors/EditModalSelector";

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
          label="follow"
          secondary
          onClick={() => {}}
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
