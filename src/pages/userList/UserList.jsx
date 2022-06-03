import * as React from 'react';
//import { DataGrid } from '@material-ui/data-grid';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//import {DataGrid} from "core"
import "./userList.css"
import { DeleteOutline } from '@material-ui/icons';
import { rows } from '../../dummy';
import {Link} from "react-router-dom"
import {fetchUsers,getUsers,fetchFailed} from "../../redux/userListRedux"
import { userRequest } from '../../requestMethods'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { deleteUserData } from '../../redux/apiCalls';

const UserList = () => {
    
   
    const dispatch = useDispatch()

    const userData = useSelector(state=>state.userList.users)
    
    React.useEffect(()=>{
          const userReq = async() =>{
              dispatch(fetchUsers())
              try{
                const res = await userRequest.get("users")
                dispatch(getUsers(res.data))
              }catch(e){
                dispatch(fetchFailed())
              }
          }
      userReq()
      },[])


      const handleDelete = (id) =>{
        deleteUserData(id,dispatch)
       
      }


        const columns= [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'user', headerName: 'Username', width: 190, renderCell:(params)=>{
            return (
                <div className='imageFieldContainer'>
                    <img src ="https://media-exp1.licdn.com/dms/image/C4D03AQGyvIhK1tdFWw/profile-displayphoto-shrink_200_200/0/1606683562224?e=1658361600&v=beta&t=CVNV98GC2Rka_op-Yf3qeMu7l9J60_BGrgYwxERqMUI" alt="picture" className='imageRow'/>
                    {params.row.username}  
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 190 },
        { field: 'isAdmin', headerName: 'Status',sortable: false,width: 160},
        { field: 'updatedAt', headerName: 'Transaction',sortable: false,width: 160},
        { field: 'action', headerName: 'Action',sortable: false,width: 160,renderCell:(params)=>{
      return(
            <>
            
            <Link to={"/users/"+params.row._id}>
             <button className='userListEdit'>Edit</button>
             </Link>
              <DeleteOutline className='userListDelete' onClick={()=>{
                  handleDelete(params.row._id)
}}/>  
              </>
             
       
      )
  }}
];


 
  return (
    <div className='userList'>
        
    <DataGrid
      rows={userData}
      disableSelectionOnClick
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5]}
      checkboxSelection
      getRowId ={(row) => row._id} 
    />
  </div>
  )
}

export default UserList