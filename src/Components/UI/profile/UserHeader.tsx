import Avatar from '../Avatar/Avatar';

interface userProps {
    userId : string;
    coverImage : string;
    name : string;
}

const UserHeader:React.FC<userProps> = ({userId , coverImage , name}) => {
    
  return (
    <div className='bg-neutral-700 h-44 relative'>
      { coverImage && (
        <img src={coverImage} alt="Cover Image" className='object-cover' />
      ) }

      <div className='absolute -bottom-16 left-4'>
          <Avatar name={name} userId={userId} isLarge hasBorder />
      </div>
    </div>
  )
}

export default UserHeader
