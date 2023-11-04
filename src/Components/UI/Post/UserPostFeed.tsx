import {useEffect , useState} from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userPostSelector } from '../../../Store/Selectors/userPostSelector';
import { ClipLoader } from 'react-spinners';
import PostItem from './PostItem';

interface PostProps {
    userId ?: string;
}



const UserPostFeed:React.FC<PostProps> = ({userId}) => {
    
        const PostList = useRecoilValue(userPostSelector);
        const setPostList = useSetRecoilState(userPostSelector);
        const [isLoading ,setIsLoading] = useState(true)
      
        useEffect(() => {
            const fetchData = async() => {
               const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/post/${Number(userId)}`);
               setPostList(data.posts);
               setIsLoading(false);
            }
            fetchData();
        },[userId])

  return (
  <>
  {
    isLoading ? (
      <div className='flex justify-center items-center mt-80'>
        <ClipLoader color='lightblue' size={80}/>
     </div>
    ) : (
      <>
      {
        PostList.map((post) => (
          <PostItem userId={String(post.userId)} 
                    key={post.id}
                    body={post?.body}
                    name={post.user?.name}
                    username={post.user?.username}
                    like={post.likedIds.length}
                    comments={post.comments.length}

          />
        ) )
      } 
      </>
    )
   }
  </>
  )
}

export default UserPostFeed
