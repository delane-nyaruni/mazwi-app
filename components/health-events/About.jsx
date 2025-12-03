import React from 'react'
import { Link } from 'react-router-dom'
import Theme from '../theme/UI-setting/Theme'
import NavIndex from '../ui/NavIndex'

<>
<Theme />
  <NavIndex />
</>
const About = () => {
  
  return (
    
    <div>
        <h4>Version 1.0.1</h4>
        <Link to='/'>Back</Link>
        <br /><br /><br /><br />
        <Link to='../theme/UI-setting/Theme'>Setting</Link>
        <Link to='../nav-ui/NavIndex'>Nav</Link>
       
    </div>
  )
}

export default About