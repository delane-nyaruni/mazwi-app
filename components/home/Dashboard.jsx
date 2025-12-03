import { useState } from 'react'
import './Dashboard.css'
import Header from './Header'
// import Sidebar from './SideBar'
// import NavBar from './NavBar'
// import Home from './Home'

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      {/* <Home /> */}
      {/* <NavBar /> */}
    </div>
  )
}

export default Dashboard