import { CalendarToday, Email, Home, MobileFriendlyOutlined, PermIdentity, Publish } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import "./user.css"
import {format} from "timeago.js"
import {updateUserData} from "../../redux/apiCalls"

const User = () => {
    const location = useLocation()
    const userID = location.pathname.split("/")[2]
    const userData = useSelector(state=>state.userList.users.find((item)=>item._id === userID))
    const[updateUser, setUpdateUser] = React.useState({})
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        setUpdateUser((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    console.log(updateUser)

    const handleClick = (e) =>{
        e.preventDefault()
        updateUserData(userID, updateUser, dispatch)
      
    }
   

  return (
    <div className='user'>
      <div className='userTitleContainer'>
          <h1 className='userTitle'>Edit User</h1>
          <Link to={"/newUser"}>
          <button className='userAddButton'>Create</button>
          </Link>
      </div>
      <div className='userContainer'>
          <div className='userShow'>

        <div className='userShowTop'>
        <img src='https://avatars.githubusercontent.com/u/57535574?v=4' alt=" " className='userShowImg'/>
       

        <div className='userShowTopTitle'>
            <span className='userShowUsername'>Jamal Ashraf</span>
            <span className='userShowUserTitle'> Software Engineer</span>
        </div>
        </div>
        <div className='userShowBottom'>
            <span className='userShowTitle'>Account Details</span>
            <div className='userShowInfo'>
            <PermIdentity className="userShowIcon"/>
            <span className='userShowInfoTitle'>{userData.username}</span>
            </div>

            <div className='userShowInfo'>
            <CalendarToday className="userShowIcon"/>
            <span className='userShowInfoTitle'>{format(userData.createdAt)}</span>
            </div>
            

            <div className='userShowInfo'>
            <Email className="userShowIcon"/>
            <span className='userShowInfoTitle'>{userData.email}</span>
            </div>

            <div className='userShowInfo'>
            <Home className="userShowIcon"/>
            <span className='userShowInfoTitle'>Chemnitz, Germany</span>
            </div>
        </div>

          </div>
          <div className='userUpdate'>
            <span className='userUpdateTitle'>Edit</span>
            <form className='userUpdateForm'>
                <div className='userUpdateLeft'>
                    <div className='userUpdateItem'>
                        <label>Username</label>
                        <input type="text" 
                        placeholder={userData.username}
                        className='userUpdateInput'
                        name='username'
                        onChange={handleChange}
                        />
                    </div>

                    <div className='userUpdateItem'>
                        <label>Email</label>
                        <input type="text" 
                        placeholder={userData.email}
                        className='userUpdateInput'
                        name="email"
                        onChange={handleChange}
                        />
                    </div>

                    <div className='userUpdateItem'>
                        <label>Password</label>
                        <input type="text" 
                        placeholder='+491786552244' 
                        className='userUpdateInput'
                        name="password"
                        onChange={handleChange}
                        />
                    </div>

                    <div className='userUpdateItem'>
                        <label>Address</label>
                        <input type="text" 
                        placeholder='Chemnitz Germany' 
                        className='userUpdateInput'
                        />
                    </div>
                </div>
                <div className='userUpdateRight'>

                    <div className="userUpdateUpload">
                        <img src="https://avatars.githubusercontent.com/u/57535574?v=4" className='userUpdateImg'/>
                        <label style={{cursor:"pointer"}} for='file'><Publish className='userUpdateIcon'/></label>
                        <input type="file" id="file"style={{display:"none"}}/>
                    </div>
                    <button onClick={handleClick} className='userUpdateButton'> Update</button>
                </div>
            </form>

          </div>
      </div>
    </div>
  )
}

export default User