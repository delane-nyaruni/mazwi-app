import { useState } from 'react'
import Header from '../../../home/Header'
import UserHomeView from '../../../home/user/UserHomeView'
import UserNavBar from './UserNavBar' 
import UserSideBar from './UserSideBar' 

function UserDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <UserSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <UserHomeView />
      <UserNavBar />
    </div>
  )
}

export default UserDashboard