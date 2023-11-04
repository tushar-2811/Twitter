import {  useRecoilValue, useSetRecoilState } from "recoil"
import Button from "../Button/Button"
import { LoginModalSelector } from "../../../Store/Selectors/LoginModalSelector"
import { RegisterModalSelector } from "../../../Store/Selectors/RegisterModalSelector";
import { authSelector } from "../../../Store/Selectors/authSelector";
import Avatar from "../Avatar/Avatar";
import Cookies from "js-cookie";
import {useState} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { PostSelector } from "../../../Store/Selectors/PostSelector";




const Form = () => {
    const setLoginModal = useSetRecoilState(LoginModalSelector);
    const setRegisterModal = useSetRecoilState(RegisterModalSelector);
    const isAuthenticated = useRecoilValue(authSelector);
    const setPostList = useSetRecoilState(PostSelector);
    
    const [body , setBody] = useState("");
    const [isLoading , setIsLoading] = useState(false);

    const handleUploadPost = async() => {
      try {
        setIsLoading(true);
          const {data} = await axios.post(`http://127.0.0.1:8000/api/v1/post/${Number(Cookies.get("userId"))}/create-post` , {body});
          setIsLoading(false);
          setBody("");
          // setPostList([...data.p]
          setPostList(data.post);
          toast.success(data.msg);
        
      } catch (error) {
        console.log(error);
        toast.error("something went bad");
      }
         
    }
    
  return (
    <div className="border-b-[1px] border-neutral-800 px-5">
        <div className="py-8">
           {
             !isAuthenticated ? (
                <>
                 <h1 className="
               text-white
               text-2xl
               text-center
               mb-4
               font-bold
           "> 
            Welcome to Twitter 
            </h1>
            <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Log In" onClick={ () => setLoginModal({isOpen : true})} />
            <Button label="Register" onClick={() => setRegisterModal({isOpen : true})}  />
            </div>
                </>
            ) : (
                <div className="flex flex-row gap-2">
                    <div>
                      <Avatar userId={Cookies.get('userId') || ""} name={Cookies.get('user') || ""} />
                    </div>
                    <div className="w-full">
                      <textarea 
                       disabled={isLoading}
                       onChange={(e) => setBody(e.target.value)}
                       value={body}
                       className="
                         disabled:opacity-80
                         peer
                         resize-none
                         mt-3
                         w-full
                         bg-black
                         ring-0
                         outline-none
                         text-[20px]
                         placeholder-neutral-500
                         text-white
                       "
                       placeholder="What's Happening ?"
                      >
                      </textarea>
                      <hr 
                        className="
                           opacity-0
                           peer-focus:opacity-100
                           h-[1px]
                           w-full
                           border-neutral-800
                           transition
                        "
                      />
                      <div className="mt-4 flex flex-row justify-end">
                        <Button 
                        disabled={isLoading}
                        onClick={handleUploadPost}
                        label="Tweet" 
                         />

                      </div>
                    </div>

                </div>
            )
           }
        </div>
       
    </div>
  )
}

export default Form
