import {  useRecoilValue, useSetRecoilState } from "recoil"
import {useEffect , useState} from 'react'
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PostItem from "./PostItem";
import { PostSelector } from "../../../Store/Selectors/PostSelector";

interface PostProps {
  url : string;
}


const PostFeed:React.FC<PostProps> = ({url}) => {
  const PostList = useRecoilValue(PostSelector);
  const setPostList = useSetRecoilState(PostSelector);
  const [isLoading ,setIsLoading] = useState(true)

  useEffect(() => {
      const fetchData = async() => {
         const {data} = await axios.get(url);
         setPostList(data.posts);
         setIsLoading(false);
      }
      fetchData();
  },[])

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

export default PostFeed
