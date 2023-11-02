import { useParams } from "react-router-dom"
import {useEffect , useState} from 'react'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import Header from "../Components/UI/Header/Header"
import UserHeader from "../Components/UI/profile/UserHeader"
import UserBio from "../Components/UI/profile/UserBio"

const Profile = () => {
    const {userId , name} = useParams();
    const [isLoading , setisLoading] = useState(true);
    const [user , setUser] = useState<any>();
    const [followers , setFollowers] = useState("0");

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/user/${userId}`);
            setUser({...data.user});
            setFollowers(data.followers);
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
              <UserBio name={user.name} bio={user.bio} username={user.username} userId={userId} followersCount={followers} following={user?.followingIds?.length} />
            </div>
          )
    }


export default Profile
