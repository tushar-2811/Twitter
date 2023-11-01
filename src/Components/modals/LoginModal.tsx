import { useCallback, useState } from "react";
import { LoginModalSelector } from "../../Store/Selectors/LoginModalSelector"
import Modal from "../UI/modal/Modal"
import {useRecoilValue , useSetRecoilState} from 'recoil'
import Input from "../UI/Input/Input";
import { RegisterModalSelector } from "../../Store/Selectors/RegisterModalSelector";
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";


const LoginModal = () => {
   const loginModal = useRecoilValue(LoginModalSelector);
   const registerModal =useRecoilValue(RegisterModalSelector);
   const setRegisterModal = useSetRecoilState(RegisterModalSelector);
   const setLoginModal = useSetRecoilState(LoginModalSelector);
   const [isLoading , setIsLoading] = useState(false);
   const [username , setUsername] = useState("");
   const [password , setPassword] = useState("");

   const navigate = useNavigate();

   const handleClose = () => {
      setLoginModal({isOpen : false});
   }

   const handleSignUpButton = useCallback(() => {
    if(isLoading){
      return;
    }
      setLoginModal({isOpen : false});
      setRegisterModal({isOpen : true});
   },[loginModal ,registerModal ])

   const handleSubmit = useCallback(async() => {
        try {
          setIsLoading(true);
          // submit the form and login
          const {data} = await axios.post("http://127.0.0.1:8000/api/v1/auth/login" , {username , password});
           setIsLoading(false);
           console.log(data);

           if(data.ok){
              setLoginModal({isOpen : false});
              Cookies.set('authToken' , data.token);
              navigate('/');
              toast.success(data.msg);
           }else{
            toast.error(data.msg);
           }
          
        } catch (error) {
           console.log(error);
           toast.error("something went wrong");
        } finally {
           setIsLoading(false);
        }
   },[loginModal , username, password])

   const bodyContent = (
      <div className="flex flex-col gap-2">

        <Input
        placeholder="Username"
        value={username}
        type="text"
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
        />

        <Input
        placeholder="Password"
        value={password}
        type="password"
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
        />

      </div>
   )

   const footerContent = (
      <div className="text-neutral-400 text-center p-4">
        <p> Create New Account !&nbsp; 
          <span
          onClick={handleSignUpButton}
          className="text-sky-500 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
   )

  return (
   <Modal
     actionLabel="Sign In"
     disabled={isLoading}
     isOpen={loginModal.isOpen}
     title="Sign In"
     onClose={handleClose}
     onSubmit={handleSubmit}
     body={bodyContent}
     footer={footerContent}
   />
  )
}

export default LoginModal
