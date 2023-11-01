import {BsHouseFill , BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import SideBarLogo from '../UI/SideBar/SideBarLogo'
import SideBarItem from '../UI/SideBar/SideBarItem'
import SideTweetButton from '../UI/Button/SideTweetButton'
import Button from '../UI/Button/Button'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate();
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
      href : "/profile",
      icon : FaUser
    }
   ]

   const handleLogout = () => {
        Cookies.remove('authToken');
        navigate('/');
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
             <SideTweetButton/>
             
            {
              Cookies.get('authToken') ? (
                <Button label='Log Out' fullWidth secondary onClick={handleLogout}/>
              ) : ("")
            }
          </div>
          
      </div>
      
    </div>
  )
}

export default SideBar
