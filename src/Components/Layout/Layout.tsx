import React from 'react';
import SideBar from './SideBar';
import FollowBar from './FollowBar';
import {Outlet} from 'react-router-dom'
import Modal from '../UI/modal/Modal';

// interface LayoutProps {
//     children : React.ReactNode
// }

const Layout:React.FC = () => {
  return (
    <div className='h-screen bg-black'>
      {/* <Modal title="tushar" isOpen={false} actionLabel='Submit' /> */}
        <div className='container h-full mx-auto xl:px-30 max-w-6xl '>
             <div className='grid grid-cols-4 h-full'>
                <SideBar/>
                <div className='col-span-3
                                lg:col-span-2
                                border-x-[1px]
                                border-neutral-700' >
                 <Outlet/>
                </div>
                <FollowBar/>
            </div> 
        </div>
      
    </div>
  )
}

export default Layout
