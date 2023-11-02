import { useCallback, useEffect, useState } from "react";
import Modal from "../UI/modal/Modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EditModalSelector } from "../../Store/Selectors/EditModalSelector";
import toast from 'react-hot-toast'
import Input from "../UI/Input/Input";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../UI/profile/ImageUpload";


const EditModal = () => {
  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(false);
  const EditModal = useRecoilValue(EditModalSelector);
  const setEditModal = useSetRecoilState(EditModalSelector);
  const [name , setName] = useState("");
  const [username , setUserName] = useState("");
  const [bio , setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage , setCoverImage] = useState("");

  useEffect(() => {
     const fetchData = async() => {
      setIsLoading(true);
      const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/user/${Cookies.get("userId")}`);
      setName(data.user.name);
      setUserName(data.user.username);
      setBio(data.user.bio);
      setProfileImage(profileImage);
      setCoverImage(coverImage);
      setIsLoading(false);
    }
    
    fetchData();
  } ,[Cookies.get("userId")])


  const handleClose = () => {
    setEditModal({isOpen : false});
  }

  const handleSubmit = useCallback(async() => {
        try {
          setIsLoading(true);

          const {data} = await axios.post(`http://127.0.0.1:8000/api/v1/user/${Cookies.get("userId")}/update-user` , {
            name , username , bio , profileImage , coverImage
          });
          setIsLoading(false);

          if(data.ok) {
             setEditModal({isOpen : false});
            //  navigate(`/profile/${Cookies.get("userId")}/${Cookies.get("user")}`);
            navigate('/')
             toast.success(data.msg);
          }else{
            toast.error(data.msg);
           }

          // backend stuff
          
        } catch (error) {
          console.log(error);
          toast.error("something went wrong")
        }finally{
          setIsLoading(false);
        }
  },[name , username ,EditModal , bio , profileImage , coverImage])

  const bodyContent:React.ReactElement = (
    <div className="flex flex-col gap-4">
      <ImageUpload 
      value={profileImage}
      disabled={isLoading}
      label={"Upload profile Image"}
      onChange={(image) => setProfileImage(image)}
       />
       <ImageUpload 
      value={coverImage}
      disabled={isLoading}
      label={"Upload Cover Image"}
      onChange={(image) => setCoverImage(image)}
       />
      <Input
      placeholder="Name"
      value={name}
      disabled={isLoading}
      onChange={(e) => setName(e.target.value)}
      />
      <Input
      placeholder="UserName"
      value={username}
      disabled={isLoading}
      onChange={(e) => setUserName(e.target.value)}
      />
      <Input
      placeholder="Bio"
      value={bio}
      disabled={isLoading}
      onChange={(e) => setBio(e.target.value)}
      />
    </div>
  ) 
  return (
   <Modal
    disabled={isLoading}
    actionLabel="Update"
    title="Update-Details"
    onSubmit={handleSubmit}
    onClose={handleClose}
    isOpen={EditModal.isOpen}
    body={bodyContent}
   />
  )
}

export default EditModal;
