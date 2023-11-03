import {BsHouseFill , BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import SideBarLogo from '../UI/SideBar/SideBarLogo'
import SideBarItem from '../UI/SideBar/SideBarItem'
import SideTweetButton from '../UI/Button/SideTweetButton'
import Button from '../UI/Button/Button'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { authSelector } from '../../Store/Selectors/authSelector'


const SideBar = () => {
  const navigate = useNavigate();
  const setisAuthenticated = useSetRecoilState(authSelector);
   const items = [
     {
       label : "Home",
       href : "/",
       icon : BsHouseFill
     },
     {
      label : "Notifications",
      href : "/notifications",
      icon : BsBellFill
    },
    {
      label : "Profile",
      href : `/profile/${Cookies.get('userId')}/${Cookies.get('user')}`,
      icon : FaUser
    }
   ]

   const handleLogout = () => {
        setisAuthenticated(false);
        Cookies.remove('authToken');
        Cookies.remove('userId');
        Cookies.remove('user');
        navigate('/');
        toast.success("Logout successful");
   }

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
          <div className='space-y-2 lg:w-[230px]'>
             <SideBarLogo/>
             {
               items.map((item) => (
                 <SideBarItem 
                   key={item.href}
                   href={item.href}
                   label={item.label}
                   icon={item.icon}
                 />
               ))
             }
             
            {
              Cookies.get('authToken') ? (
                <Button label='Log Out' fullWidth secondary onClick={handleLogout}/>
              ) : ("")
            }

            <SideTweetButton/> 
          </div>
          
      </div>
      
    </div>
  )
}

export default SideBar
