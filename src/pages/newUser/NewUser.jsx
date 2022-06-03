import React from 'react'
import "./newUser.css"
import {addUser} from "../../redux/apiCalls"
import { useDispatch } from 'react-redux'


const NewUser = () => {

 const[newUserData, setNewUserData] = React.useState({})
 const dispatch = useDispatch()
 const handleChange = (e) => {
   
    setNewUserData((prev)=>{
       return { ...prev, [e.target.name]:e.target.value}
    })
 }

 const handleSubmit = (e) =>{
    e.preventDefault()
    addUser(newUserData,dispatch)

 }
console.log(newUserData)

  return (
    <div className='newUser'>
    <h1 className='newUserTitle'>New User</h1>
    <form className='newUserForm'>

        <div className='newUserItem'>
        <label>Username</label>
        <input type="text" name="username" placeholder='jamal' onChange={handleChange}/>
        </div>

        <div className='newUserItem'>
        <label>Full name</label>
        <input type="text"  placeholder='jamal ashraf'/>
        </div>

        <div className='newUserItem'>
        <label>Email</label>
        <input type="email" name="email" placeholder='jamal8548@gmail.com' onChange={handleChange} />
        </div>

        <div className='newUserItem'>
        <label>Password</label>
        <input type="password" name="password" placeholder='********' onChange={handleChange}/>
        </div>

        <div className='newUserItem'>
        <label>Phone</label>
        <input type="text" placeholder='+49178454575'/>
        </div>

        <div className='newUserItem'>
        <label>Address</label>
        <input type="text" placeholder='Chemnitz Germany'/>
        </div>

        <div className='newUserItem'>
        <label>Gender</label>

        <div className="newUserGender">
        <input type="radio" name="gender" id="male" value="male"/>
        <label for='male'>Male</label>

        <input type="radio" name="gender" id="female" value="female"/>
        <label for='femlae'>Female</label>

        <input type="radio" name="gender" id="other" value="other"/>
        <label for='other'>Other</label>
        <button onClick={handleSubmit} className='newUserButton'> Create </button>
        </div>

        
        </div>
        <div className='newUserItem'>
            <label>isAdmin</label>
            <select className='newUserSelect' name="isAdmin" id="active" onChange={handleChange}>
                <option>
                  ---
                </option>
                <option value="true">
                    YES
                </option>
                <option value="false">
                    NO
                </option>
            </select>
        </div>
    </form>
    </div>
  )
}

export default NewUser