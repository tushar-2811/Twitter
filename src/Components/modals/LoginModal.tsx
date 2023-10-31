import { useCallback, useState } from "react";
import { LoginModalSelector } from "../../Store/Selectors/LoginModalSelector"
import Modal from "../UI/modal/Modal"
import {useRecoilValue , useSetRecoilState} from 'recoil'
import Input from "../UI/Input/Input";
import { RegisterModalSelector } from "../../Store/Selectors/RegisterModalSelector";


const LoginModal = () => {
   const loginModal = useRecoilValue(LoginModalSelector);
   const setRegisterModal = useSetRecoilState(RegisterModalSelector);
   const setLoginModal = useSetRecoilState(LoginModalSelector);
   const [isLoading , setIsLoading] = useState(false);
   const [username , setUsername] = useState("");
   const [password , setPassword] = useState("");

   const handleClose = () => {
      setLoginModal({isOpen : false});
   }

   const handleSignUpButton = () => {
    if(isLoading){
      return;
    }
      setLoginModal({isOpen : false});
      setRegisterModal({isOpen : true});
   }

   const handleSubmit = useCallback(() => {
        try {
          if(isLoading){
            return;
          }

          // submit the form and login
          
        } catch (error) {
           console.log(error);
        } finally {
           setIsLoading(false);
        }
   },[loginModal])

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
