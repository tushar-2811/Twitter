import { useParams } from "react-router-dom"
import {useEffect , useState} from 'react'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import Header from "../Components/UI/Header/Header"
import UserHeader from "../Components/UI/profile/UserHeader"

const Profile = () => {
    const {userId , name} = useParams();
    const [isLoading , setisLoading] = useState(true);
    const [user , setUser] = useState<any>();

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/user/${userId}`);
            setUser({...data.user});
            setisLoading(false);
          }         
          fetchData();
          console.log(user);
    },[userId])

    if(isLoading) {
        return (
          <div className='flex justify-center items-center mt-80'>
             <ClipLoader color='lightblue' size={80}/>
          </div>
        )
    }

    return (
            <div>
              <Header showBackArrow label={user.name} />
              <UserHeader name={user.name} userId={user.id} coverImage={user.coverImage} />
            </div>
          )
    }


export default Profile
