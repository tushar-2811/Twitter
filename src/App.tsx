import './App.css'
import {Routes , Route} from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home'
import LoginModal from './Components/modals/LoginModal'
import RegisterModal from './Components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'
import Profile from './Pages/Profile'
import EditModal from './Components/modals/EditModal'

function App() {


  return (
    <>
     <LoginModal/>
     <RegisterModal/>
     <EditModal/>
     <Toaster/>
      <Routes>
         <Route path='/' element={<Layout />}> 
           <Route index element={<Home/>} />
           <Route path='profile/:userId/:name' element={<Profile/>} />
          </Route>
        
      </Routes>
    </>
  )
}

export default App
