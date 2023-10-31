import {BsTwitter} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'

const SideBarLogo = () => {
    const navigate = useNavigate();
  return (
    <div 
    onClick={() => navigate('/')}
    className='
         rounded-full
         h-14
         w-14
         p-4
         flex 
         items-center
         justify-center
         cursor-pointer
         transition
         hover:bg-blue-300
         hover:bg-opacity-10    
    ' >
      <BsTwitter size={28} color='white' />
    </div>
  )
}

export default SideBarLogo
