import './App.css'
import {Routes , Route} from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home'
import LoginModal from './Components/modals/LoginModal'
import RegisterModal from './Components/modals/RegisterModal'

function App() {


  return (
    <>
     <LoginModal/>
     <RegisterModal/>
      <Routes>
         <Route path='/' element={<Layout />}>
           
           <Route index element={<Home/>} />
          </Route>
        
      </Routes>
    </>
  )
}

export default App
