import {createSlice} from "@reduxjs/toolkit";

const userListSlice = createSlice({
    name:"userlist",

    initialState:{
        users:[],
        isFetching:false,
        error:false
    },

    reducers:{

        fetchUsers:(state)=>{
            state.isFetching = true

        },
        getUsers:(state,action)=>{
            state.users = action.payload
            state.isFetching= false
         
            
        },
        fetchFailed:(state)=>{
            state.error= true
            state.isFetching= false
        },

        //CREATE USER

        createUserStart:(state)=>{
            state.isFetching=true
        },
        createUserSuccess:(state,action)=>{
            state.users.push(action.payload)
            state.isFetching = false
        },
        createUsersFailed:(state)=>{
            state.isFetching = false
            state.error = true
        },


        //UPDATE USER
        updateUserStart:(state)=>{
            state.isFetching=true
        },
        updateUserSuccess:(state,action)=>{
            state.users[state.users.findIndex(item=>item.id === action.payload.id)] = action.payload.user
            state.isFetching = false
        },
        updateUsersFailed:(state)=>{
            state.isFetching = false
            state.error = true
        },


          //DELETE USER
        deleteUserStart:(state)=>{
            state.isFetching=true
        },
        deleteUserSuccess:(state,action)=>{
            state.users.splice(state.users.findIndex(item=>item.id === action.payload.id),1)
            state.isFetching = false
        },
        deleteUsersFailed:(state)=>{
            state.isFetching = false
            state.error = true
        }


    }  
})

export const {deleteUserStart,deleteUserSuccess,deleteUsersFailed,fetchUsers,getUsers,fetchFailed,createUserStart,createUserSuccess,createUsersFailed,updateUserStart,updateUserSuccess,updateUsersFailed} = userListSlice.actions
export default userListSlice.reducer