import Form from "../Components/UI/Post/Form"
import Header from "../Components/UI/Header/Header"
import PostFeed from "../Components/UI/Post/PostFeed"

const Home = () => {
  
  return (
    <div >
       <Header  label="Home" />
       <Form/>
       <PostFeed url={"http://127.0.0.1:8000/api/v1/post/all-posts"} />
    </div>
  )
}

export default Home
