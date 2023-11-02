import React , {useCallback} from 'react';
import {IconType} from 'react-icons'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { LoginModalSelector } from '../../../Store/Selectors/LoginModalSelector';

interface SideBarProps {
    label : string;
    href ?: string;
    icon : IconType;
    onClick ?: () => void
}

const SideBarItem:React.FC<SideBarProps> = ({
    label,
    href,
    icon : Icon ,
    onClick
}) => {
  const navigate = useNavigate();
  const setLoginModal = useSetRecoilState(LoginModalSelector);
  

  const handleClick = useCallback(() => {
    const authToken = Cookies.get("authToken");
    if(!authToken){
      setLoginModal({isOpen : true});
      return;
    }

    if(onClick){
      return onClick;
    }

      if(href){
        navigate(href);
      }
  },[navigate , onClick , href])
  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div className='
           relative
           rounded-full
           h-14
           w-14
           flex
           items-center
           justify-center
           p-4 
           cursor-pointer
           hover:bg-slate-300
           hover:bg-opacity-10
           lg:hidden
      '>
         <Icon size={28} color='white' />
      </div>

      <div className='
           relative
           hidden
           lg:flex
           p-4
           gap-4
           rounded-full
           items-center
           cursor-pointer
           hover:bg-opacity-10
           hover:bg-slate-300
      '>

        <Icon size={24} color='white' />
        <p className='hidden text-white text-xl lg:block'>
            {label}
        </p>

      </div>
    </div>
  )
}

export default SideBarItem
