import profile from '../../../assets/placeholder.png'
import { NavLink } from 'react-router-dom';

interface AvatarProps {
    userId : string;
    isLarge ?: boolean;
    hasBorder ?: boolean;
    profileImage ?: string;
    name : string
}

const Avatar:React.FC<AvatarProps> = ({userId , isLarge ,hasBorder , profileImage , name}) => {

  return (
    <div
    className={`
     ${hasBorder ? 'border-4 border-black' : ""}
     ${isLarge ? 'h-32' : 'h-12'}
     ${isLarge ? 'w-32' : 'w-12' }
     rounded-full
     hover:opacity-90
     transition
     relative
     cursor-pointer    
    `}>

      <NavLink to={`/profile/${userId}/${name}`}>
        <img
        height={isLarge ? 'h-32' : 'h-12'}  
        width={isLarge ? 'w-32' : 'w-12' }
        src={profileImage || profile} 
        alt="Avatar" 
        className="fill object-cover rounded-full " />
      </NavLink>


      </div>
  )
}

export default Avatar
