import React, { useEffect } from 'react'
import "./widgetSm.css"
import { Visibility } from "@material-ui/icons"
import { userRequest } from '../../requestMethods'

const WidgetSm = () => {

const [users,setUsers]= React.useState([])

React.useEffect(()=>{
    const getUsers = async()=>{
        try{
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data)
        console.log(users)
        }catch(e){
            console.log(e)
        }
    }
    getUsers()
},[])


  return (
    <div className='widgetSm'>
    <span className="widgetSmTitle">New Join Members</span>
     <ul className="widgetSmList">

            {users.map((d)=>(
            <li className="widgetSmListItem" key={d._id}>
            <img src= {d.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} className="widgetSmImg"/>
            <div className="widgetSmUser">
                <span className="widgetSmUsername">{d.username}</span>
                <span className="widgetSmUserTitle">{d.email}</span>
            </div>
            <button className="widgetSmbutton">
            <Visibility className="widthSmIcon"/>
            Display
            </button>
            </li>
            ))}

     </ul>
    </div>
  )
}

export default WidgetSm