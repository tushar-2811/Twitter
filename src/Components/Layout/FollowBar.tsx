import Avatar from "../UI/Avatar/Avatar"
import {useEffect , useState} from 'react';
import { ClipLoader } from "react-spinners";
import axios from 'axios'




const FollowBar = () => {
    const [isLoading , setisLoading] = useState(true);
    const [Users , setUsers] =  useState([]);

    useEffect(() => {
        const fetchData = async() => {
          const {data} = await axios.get("http://127.0.0.1:8000/api/v1/user/get-10");
          setUsers(data.users);
          setisLoading(false);
        }
        
        fetchData();
    },[Users])
   

    if(isLoading) {
      return (
        <div className='flex justify-center items-center mt-80'>
           <ClipLoader color='lightblue' size={80}/>
        </div>
      )

    }
  return (
    <div className='hidden px-6 py-4 lg:block '>
        <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className='text-white text-xl font-semibold' >Who to follow</h2>
          <div className='flex flex-col gap-6 mt-4'>
          {/* <Avatar userId="123" profileImage={placeholder} isLarge={false} /> */}
          {
                  Users?.map((user:any) => (
                    <div key={user.id} className='flex flex-row gap-4'>
                      <Avatar name={user.name} userId={user.id} profileImage={user.profileImage} isLarge={false} />
                      <div className='flex flex-col'>
                        <p className='text-white font-semibold text-sm' > {user.name} </p>
                        <p className='text-neutral-400 text-sm '> @{user.username} </p>
                      </div>
                    </div>
                  ))
                 }
          </div>
        </div>
    </div>
  )
}

export default FollowBar
