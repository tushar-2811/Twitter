import axios from 'axios'
import { useSetRecoilState } from 'recoil';
import {allUsersSelector} from '../Store/Selectors/allUsersSelector'

export const useUsers = async() => {
     
      const setAllUsers = useSetRecoilState(allUsersSelector)
      const {data} = await axios.get("http://127.0.0.1:8000/api/v1/user/get-10");
    
      if(data.ok) {
        setAllUsers({users : data.users});
        return data.users;
      }        
}