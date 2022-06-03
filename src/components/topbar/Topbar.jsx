import { NotificationsNone,Language,Settings } from '@material-ui/icons'
import React from 'react'
import "./topbar.css"

const Topbar = () => {
  return (
    <div className='topbar'>
     <div className='topbarWrapper'>
        <div className='topLeft'>
            <span className='logo'>Jamal Admin</span>
        </div>
        <div className='topRight'>
         <div className='topbarIconContainer'>
            <NotificationsNone/>    
            <span className='topIconBag'>2</span>
         </div>   
         <div className='topbarIconContainer'>
            <Language/>    
            <span className='topIconBag'>2</span>
         </div> 
         <div className='topbarIconContainer'>
            <Settings/>    
         </div> 
         <img src="https://avatars.githubusercontent.com/u/57535574?v=4" alt="" className='topAvatar'/>
        </div>  
     </div> 
    </div>
  )
}

export default Topbar