import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
   showBackArrow ?: boolean;
   label : string;
 }

const Header:React.FC<HeaderProps> = ({label , showBackArrow}) => {
  const navigate = useNavigate();
  
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-center gap-2">
             {
               showBackArrow && <BiArrowBack 
               onClick={() => navigate(-1)}
               color="white"
               size={20}
               className = {
                  "cursor-pointer hover:opacity-70 transition"
               }
               />
             }
             <h1 className='text-white text-xl font-semibold'> 
                {label}
             </h1>

        </div>

      
    </div>
  )
}

export default Header
