import {FaFeather} from 'react-icons/fa'
import { LoginModalSelector } from '../../../Store/Selectors/LoginModalSelector'
import {useSetRecoilState} from 'recoil'

const SideTweetButton = () => {
    const setLoginModal = useSetRecoilState(LoginModalSelector);
    const handleClick = () => {
          setLoginModal({isOpen : true});
    }
  return (
    <div onClick={handleClick} >
        <div className="
             mt-6
             lg:hidden
             rounded-full
             h-14
             w-14
             p-4
             flex
             items-center
             justify-center
             bg-sky-500
             hover:bg-opacity-80
             cursor-pointer
             transition
        ">
            <FaFeather size={24} color='white' />
        </div>

        <div className='
            mt-6
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-sky-500
            cursor-pointer
            transition
            hover:bg-opacity-90
        '>
            <p className=' hidden lg:block text-center font-semibold text-white text-[20px]'>
                Tweet
            </p>

        </div>
    </div>
  )
}

export default SideTweetButton
